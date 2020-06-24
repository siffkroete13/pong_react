// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import WebsocketClient from "./io/websocket_client";


class Game extends Component {
    /*
    constructor(props) {
        super(props);
    }
    */

    handleMessage = (msg) => {
        
    }
      
    render() {
        return (
            <div>
                Pong Game!
                <WebsocketClient
                    handleMessage={this.handleMessage}
                />
            </div>
        );
    }
}

export default Game;
