// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { gameReducer } from './reducers/gameReducer';
import getWebsocketClientInstance from "./io/websocket_client";
// import Player from './player';
import './css/Game.css';
import StartForm from './io/start-form';
import ChatForm from './io/chat-form';
import {
    MY_PLAYER,
    FOREIGN_PLAYER,
    ACTIONS,
    // move_left_paddle,
    // move_right_paddle,
    // move_ball,
    // move_object,
    sendGameControlMsg,
    sendChatMsg,
    sendGameData,
    startGame
} from './actions/';


class Game extends Component {
    constructor(props) {
        super(props);
        this.usernames[MY_PLAYER] = 'MY_PLAYER'; // Später bekommen die Spieler andere Namen
        this.usernames[FOREIGN_PLAYER] = 'FOREIGN_PLAYER'; // Später bekommen die Spieler andere Namen
        this.chatText[MY_PLAYER] = '';
        this.chatText[FOREIGN_PLAYER] = '';
        this.state = {
            gameState: 'stop',
            connectionState: 'disconnected',
            usernames : this.usernames,
            chatText: this.chatText,
            ball_state: {},
            paddle_state: {}
        }
        this.websocketClient = getWebsocketClientInstance();
        this.websocketClient.onConnect = this.handleConnect;
        this.websocketClient.onMessage = this.handleMessage;
        this.websocketClient.onClose = this.handleClose;
        this.websocketClient.onError = this.handleError;

    }

    connectionState = 'disconnected';
    usernames = [];
    chatText = [];
    websocketClient;
    stopId = 0;
    lastTime = 0;
    deltaTime = 0;
    renderLoopIsRunning = false;
    playerCount = 2;

    renderLoop = (time = 0) => {
        this.deltaTime = time - this.lastTime;
        this.lastTime = time;
        this.stopId = window.requestAnimationFrame(this.renderLoop);
    }

    startRenderLoop = () => {
        this.lastTime = 0;
        window.requestAnimationFrame(this.renderLoop);
    }

    stopRenderLoop = () => {
        window.cancelAnimationFrame(this.stopId);
    }

    toggleRenderLoop = () => {
        if(this.renderLoopIsRunning === false) {
            this.startRenderLoop();
            this.renderLoopIsRunning = true;
        } else {
            if(this.stopId) this.stopRenderLoop();
            else console.error('Hier sollte die stopId gesetzt sein damit man die render-loop stoppen kann!');
            this.renderLoopIsRunning = false;
        }
    }

    connectToServer = (e) => {
        this.websocketClient.connect();
    }

    handleConnect = (msg) => {
        this.setState({
            connectionState: 'connected',
        });
    }

    handleMessage = (_msg) => {
        console.log('Game::handleMessage(), _msg.data: ', _msg.data);
        let msg = _msg.data || _msg;
        if(typeof msg === 'string') msg = JSON.parse(msg);
        
        console.log('handleMessage in Game.js, msg: ', msg);
        switch(msg.type) {
            // Chat-Nachricht gekommen
            case ACTIONS.RECEIVE_CHAT_MSG:
                this.chatText[FOREIGN_PLAYER] = msg.payload.text;
                this.setState({
                    chatText: this.chatText
                });
            break;
            case ACTIONS.SEND_CHAT_MSG:
                this.websocketClient.sendUtf8(msg);
                this.chatText[MY_PLAYER] = ''; // Beim Senden der Nachricht Feld 1 (vom diesem Spieler) leer machen und 
                // Feld 2 (vom Gegenspieler) mit der Nachricht füllen, so quasi als Effekt, ist aber nicht wirklich nötig
                this.chatText[FOREIGN_PLAYER] = msg.payload.text; 
                this.setState({
                    chatText: this.chatText
                });
            break;
            case ACTIONS.SEND_GAME_CONTROL_MSG:
                this.handleGameControlMsg(msg);
            break;
            // Spile-Kontroll-Anweisung gekommen
            case ACTIONS.RECEIVE_GAME_CONTROL_MSG:
                console.log('ACTIONS.RECEIVE_GAME_CONTROL_MSG');
                this.handleGameControlMsg(msg);
            break;
            default:
                console.error('Unbekannte Nachricht in handleMessage!');
        }
        
    }

    // Hier werden die Spile-Kontroll-Anweisungen verarbeitet
    handleGameControlMsg = (msg) => {
        switch(msg.payload.instruction) {
            case 'START_GAME':
                if(msg.from === this.usernames[MY_PLAYER]) {// Wenn Nachricht von diesem Spieler an den anderen Spieler?
                    console.log('Nachricht ===> Spieler Game::handleGameControlMsg(..)!');
                    // dann weitersenden an den anderen Spieler
                    this.websocketClient.sendUtf8(msg);
                    this.gameState = 'GAME_STARTING';
                    this.setState({
                        gameState: this.gameState
                    });
                } else { // Nachricht vom anderen Spieler
                    console.log('Nachricht <=== Spieler Game::handleGameControlMsg(..)!');
                    // Wenn noch kein vernünftiger Name dann Name zuweisen
                    if(msg.payload.from) {
                        this.usernames[FOREIGN_PLAYER] = msg.payload.from;
                    }
                    this.gameState = 'GAME_RUN';
                    this.setState({
                        usernames: this.usernames,
                        gameState: this.gameState
                    });
                }
            break;
            default:
                console.error('Unbekannte Nachricht in hanleGameControlMsg!');
        }
    }

    handleClose = (msg) => {
        const _this = this;
        console.log('Game::handleClose aufgerufen. Versuche wieder zu connecten');
        this.setState({
            connectionState: 'disconnected',
            gameState: 'GAME_STOP'
        }, () => {
            console.log('Innerhalb setState-callback, Kurz vor setTimeout()');
            setTimeout(() => {
                _this.connectToServer();
            }, 500)
        });
    }

    handleError = (msg) => {
        this.setState({
            connectionState: 'connection_error',
        });
    }

    sendChatMsg = (text) => {
        const msg = {
            type: ACTIONS.SEND_CHAT_MSG,
            payload: {
                text: text
            },
            from: this.state.usernames[MY_PLAYER],
            to: this.state.usernames[FOREIGN_PLAYER]
        }
        this.handleMessage(msg); // Alle Nachrichten müssen durch handleMessage gehen!
    }


    handleStartSubmit = (username) => {
        const msg = {
            type: ACTIONS.SEND_GAME_CONTROL_MSG,
            payload: {
                instruction: 'START_GAME',
                from: username,
                to: this.state.usernames[FOREIGN_PLAYER]
            }
        }
        this.handleMessage(msg);
    }
    

    render() {
        return (
            <div id="game_content">
                <div id="game_title">
                    <span id="haerziges_viech" >
                        <img  src="./img/siffsiff.jpg" alt="Härziges Fiech"/>
                    </span>
                    {this.props.title} Connect state: {this.state.connectionState}, Game state: {this.state.gameState}
                </div> 

                <div className="game_header">
                    <ChatForm
                        title="Chat"
                        class="chat_form"
                        text_chat_1={this.state.chatText[MY_PLAYER]}
                        text_chat_2={this.state.chatText[FOREIGN_PLAYER]}
                        handleSubmit={this.sendChatMsg}
                    />
                </div>  {/* End game_header */}

                {/* <div id="player_container">
                    <Player id={MY_PLAYER} playerName={this.state.usernames[MY_PLAYER]} />
                    <Player id={FOREIGN_PLAYER} playerName={this.state.usernames[FOREIGN_PLAYER]} />
                </div> */}

                <input type="button" value='Connect' name="connect" onClick={this.connectToServer}/>

                <StartForm handleSubmit={this.handleStartSubmit} />

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        gameState: state.gameReducer.gameState,
        connectionState: state.gameReducer.connectionState,
        ball_state: state.ball_reducer,
        paddle_state: state.paddle_reducer,
    };
}

const mapDispatchToProps = dispatch => ({
    sendGameControlMsg: (msg) => {
        dispatch(sendGameControlMsg(msg));
    },
    sendGameData: (msg) => {
        dispatch(sendGameData(msg));
    },
    sendChatMsg: (msg) => {
        dispatch(sendChatMsg(msg));
    },
    startGame: (msg) => {
        dispatch(startGame(msg));
    }
});

const connectedGameComponent = connect(mapStateToProps, mapDispatchToProps)(Game);

export default connectedGameComponent;
