// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ACTIONS,
    move_left_paddle,
    move_right_paddle,
    move_ball,
    move_object,
    sendGameControlMsg,
    sendChatMsg,
    sendGameData,
} from './actions/';
import Canvas from './components/Canvas';


class Player extends Component {
    constructor(props) {
        super(props);
        this.fieldWidth = 600;
        this.fieldHeight = 400;
        
        this.key_state = {
            up_arrow: 0, // key-code = 38
            down_arrow: 0, // key-code = 40
            left_arrow: 0, // key-code = 37,
            right_arrow: 0 /// key-code = 39
        }
    }

    stopId = 0;
    lastTime = 0;
    deltaTime = 0;
    renderLoopIsRunning = false;
    playerCount = 2;

    componentDidMount = () => {
       
    }

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

    handleSubmit = (e) => {
        
    }

    trackMouse = (e) => {

    }
      
    render() {
        return (
            <div>
                {/* <Canvas
                    fieldWidth={this.fieldWidth}
                    fieldHeight={this.fieldHeight}
                    ball_state={this.props.ball_state}
                    paddle_state={this.props.paddle_state}
                    key_state={this.key_state}
                    trackMouse={this.trackMouse}
                    handleKeyDown={this.handleKeydown}
                    handleKeyUp={this.handleKeyup}
                    tabIndex="0"
                /> */}

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        game_state: state.game_reducer,
        ball_state: state.ball_reducer,
        paddle_state: state.paddle_reducer,
    };
}

const mapDispatchToProps = dispatch => ({
    move_left_paddle: (move_object) => {
        dispatch(move_left_paddle(move_object));
    },
    move_right_paddle: (move_object) => {
        dispatch(move_right_paddle(move_object));
    },
    move_ball: (move_object) => {
        dispatch(move_ball(move_object));
    },
    sendGameControlMsg : (msg) => {
        dispatch(sendGameControlMsg(msg));
    },
    sendChatMsg : (msg) => {
        dispatch(sendChatMsg(msg));
    },
    sendGameData : (msg) => {
        dispatch(sendGameData(msg));
    }
});

const connectedPlayer = connect(mapStateToProps, mapDispatchToProps)(Player);

export default connectedPlayer;
