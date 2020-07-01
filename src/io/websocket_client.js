// eslint-disable-next-line no-unused-vars
import { w3cwebsocket as W3CWebSocket } from "websocket";

let client = null;

let instance = null;

class WebsocketClient {
    onConnect = null;
    onOpen = null;
    onMessage = null;
    onClose = null;

    constructor() {
        if(!instance) {
            instance = this;
        }
        instance.init();
        return instance;
    }

    init() {
        this.initCallbacks = this.initCallbacks.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    connect = (e) => {
        if(!client) {
            client = new W3CWebSocket('ws://127.0.0.1:8888');
        }
        
        if(client) {
            this.initCallbacks();
        } else {
            console.error('Verbindung zu Websocket fehlgeschlagen!');
        }


        if(client && this.onConnect) {
            // Den Besitzer dieses Objekts Informieren
            this.onConnect(e);
        }
    }

    send = (msg) => {
        client.send(msg);
    }
    
    initCallbacks() {
        client.onopen = this.handleOpen;
        client.onmessage = this.handleMessage;
        client.onerror = this.handleError;
        client.onclose = this.handleClose;
    }

    handleOpen(msg) {
        console.log('handleOpen() aufgerufen, msg', msg);
        if(client && this.onMessage) {
            // Den Besitzer dieses Objekts Informieren
            this.onOpen(msg);
        }
    }

    handleMessage(msg) {
        console.log('handleMessage() aufgerufen, msg', msg);
        if(client && this.onMessage) {
            // Den Besitzer dieses Objekts Informieren
            this.onMessage(msg);
        }
    }

    handleError(msg) {
        console.log('handleError() aufgerufen, msg', msg);
    }

    handleClose(msg) {
        console.log('handleClose() aufgerufen, msg', msg);
        if(client && this.onMessage) {
            // Den Besitzer dieses Objekts Informieren
            this.onClose(msg);
        }
    }
}



export default function getWebsocketClientInstance() {
    return new WebsocketClient();
}

