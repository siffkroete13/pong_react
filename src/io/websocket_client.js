// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";



const client = new W3CWebSocket('ws://127.0.0.1:8888');


class WebsocketClient extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.initCallbacks = this.initCallbacks.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            game_run: 'false',
            name: ''
        }

        this.initCallbacks();
    }
    
    initCallbacks() {
        client.onopen = this.handleOpen;
        client.onmessage = this.handleMessage;
        client.onerror = this.handleError;
        client.onclose = this.handleClose;
    }

    handleOpen(msg) {
        console.log('onopen ===> WebSocket Client Verbunden, ', msg);
    }

    handleMessage(msg) {
        console.log('onmessage ===> Nachricht vom Server: ', msg);
    }

    handleError(msg) {
        console.log('onerror ===> Fehler: ', msg);
    }

    handleClose(msg) {
        console.log('onclose ===> Verbindung wird geschlossen, ', msg);
    }

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('handleClick ===> e: ', e);
        this.setState({
            game_run: true
        });

        const msg = {
            msg_type: 'game_control',
            payload: {
                instruction: 'start_game',
                name: this.state.name
            }
        }
        
        client.send(JSON.stringify(msg));
    };

    handleGameStateChange = (e) => {
        // ArrayBuffers are a good way to allocate space to work in. In the example below I allocate 32 Bytes.
        // I can then edit it by using one of Uint32Array, Uint16Array, Float32Array to write binary data
        // to different parts of the ArrayBuffer.
        let msg = new Int8Array([ 7, 7, 7]); 
       
        // The websocket should recieve binary data as ArrayBuffers
        client.binaryType = 'arraybuffer';
        client.send(msg);
    }
    
    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text"
                        onChange={this.handleInputChange} />
                    </label>
                    <input type="submit" value='Submit' />
                </form>
            </>
        );
    }
}

export default WebsocketClient;
