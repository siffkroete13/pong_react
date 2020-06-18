// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";



const client = new W3CWebSocket('ws://127.0.0.1:8888');


class WebsocketClient extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    
    componentWillMount = () => {
        client.onopen = () => {
          console.log('onopen ===> WebSocket Client Verbunden');
        };
        client.onmessage = (message) => {
          console.log('onmessage ===> Nachricht vom Server: ', message);
        };
        client.onerror = (err) => {
            console.log('onerror ===> Fehler: ', err);
        };
        client.onclose = (e) => {
            console.log('onclose ===> Verbindung wird geschlossen, e: ', e);
        };
    }

    handleClick = (e) => {
        console.log('handleClick ===> e: ', e);

        client.send(JSON.stringify({
            type: 'utf8',
            data: 'Hi von Client!',
            error: '' // Nur so eine Idee: einfach überall (leeren) error hinzufügen damit man am anderen Ende 
            // auf empty(error) testen kann. Wenn man das überall einhält wirds einfacher.
        }));

        this.props.handleClick(e); // Weiter nach oben leiten zur Parent-Component
    };
    
    render() {
        return (
            <div>
                <button onClick={this.handleClick} >
                    Click me
                </button>
            </div>
        );
    }
}

export default WebsocketClient;
