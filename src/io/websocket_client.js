// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import connect from 'react-redux';



let client = null;



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
    }

    connect = (e) => {
        client = new W3CWebSocket('ws://127.0.0.1:8888');
        if(client) {
            this.initCallbacks();
        } else {
            console.error('Verbindung zu Websocket fehlgeschlagen!');
        }
        this.props.connect(e);
    }
    
    initCallbacks() {
        client.onopen = this.handleOpen;
        client.onmessage = this.handleMessage;
        client.onerror = this.handleError;
        client.onclose = this.handleClose;
    }

    handleOpen(msg) {
        this.props.handleMessage(msg, 'onopen');
    }

    handleMessage(msg) {
        this.props.handleMessage(msg, 'onmessage');
    }

    handleError(msg) {
        this.props.handleMessage(msg, 'onerror');
    }

    handleClose(msg) {
        this.props.handleMessage(msg, 'onclose');
    }

    render() {
        return (
            <input type="button" value='Connect' name="connect" onClick={this.connect}/>
        );
    }
}

export default WebsocketClient;
