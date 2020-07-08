// eslint-disable-next-line no-unused-vars
import { w3cwebsocket as W3CWebSocket } from "websocket";

let client = null;

let instance = null;

class WebsocketClient {
    onConnect = null;
    onMessage = null;
    onClose = null;

    constructor() {
        if(!instance) {
            instance = this;
        }
        return instance;
    }

    connect = () => {
        try {
            if(client === undefined || client === null) {
                client = new W3CWebSocket('ws://127.0.0.1:8888');
            }
            if(client) this.initCallbacks();
        } catch (err) {
            console.error('Fehler bei WebsocketClient::connect(), err: ', err);
        }
    }

    initCallbacks = () => {
        client.onopen = this.handleOpen;
        client.onmessage = this.handleMessage;
        client.onerror = this.handleError;
        client.onclose = this.handleClose;
    }

    sendUtf8 = (msg) => {
        client.send(JSON.stringify(msg));
    }

    sendBinary = (msg) => {
        client.send(msg);
    }

    handleOpen = (msg) => {
        // console.log('handleOpen() aufgerufen, msg', msg);
        if(client && this.onConnect) {
            // Den Besitzer dieses Objekts Informieren
            this.onConnect(msg);
        }
    }

    handleMessage = (msg) => {
        // console.log('handleMessage() aufgerufen, msg', msg);
        if(client && this.onMessage) {
            // Den Besitzer dieses Objekts Informieren
            this.onMessage(msg);
        }
    }

    handleError = (msg) => {
        // console.log('handleError() aufgerufen, msg', msg);
        if(client && this.onError) {
            // Den Besitzer dieses Objekts Informieren
            this.onError(msg);
        }
    }

    handleClose = (msg) => {
        // console.log('client::handleClose() aufgerufen, msg', msg);
        if(client && this.onClose) {
            // Den Besitzer dieses Objekts Informieren
            this.onClose(msg);
        }
    }
}



export default function getWebsocketClientInstance() {
    if(instance) return instance;
    return new WebsocketClient();
}

