import getWebsocketClient from '../io/websocket_client';

const websocketClient = getWebsocketClient();

export const ACTIONS = { 
    START_GAME: 'START_GAME',
    SEND_GAME_CONTROL_MSG : 'SEND_GAME_CONTROL_MSG',
    RECEIVE_GAME_CONTROL_MSG : 'RECEIVE_GAME_CONTROL_MSG',
    SEND_CHAT_MSG : 'SEND_CHAT_MSG',
    RECEIVE_CHAT_MSG : 'RECEIVE_CHAT_MSG',
    SEND_GAME_DATA : 'SEND_GAME_DATA',
    RECEIVE_GAME_DATA : 'RECEIVE_GAME_DATA',
    SET_LEFT_PADDLE : 'SET_LEFT_PADDLE',
    SET_RIGHT_PADDLE : 'SET_RIGHT_PADDLE',
    MOVE_LEFT_PADDLE : 'MOVE_LEFT_PADDLE',
    MOVE_RIGHT_PADDLE : 'MOVE_RIGHT_PADDLE',
    MOVE_BALL : 'MOVE_BALL',
    MOVE_OBJECT : 'MOVE_OBJECT',
};

export const MY_PLAYER = 0;
export const FOREIGN_PLAYER = 1;


export const set_left_paddle = (move_object) => ({
    type: ACTIONS.SET_LEFT_PADDLE,
    payload: {
        x: move_object.x,
        y: move_object.y,
        width: move_object.width,
        height: move_object.height
    }
});


export const set_right_paddle = (move_object) => ({
    type: ACTIONS.SET_RIGHT_PADDLE,
    payload: {
        x: move_object.x,
        y: move_object.y,
        width: move_object.width,
        height: move_object.height
    }
});

export const move_left_paddle = (move_object) => ({
    type: ACTIONS.MOVE_LEFT_PADDLE,
    payload: {
        x: move_object.x,
        y: move_object.y
    }
});

export const move_right_paddle = (move_object) => ({
    type: ACTIONS.MOVE_RIGHT_PADDLE,
    payload: {
        x: move_object.x,
        y: move_object.y
    }
});

export const move_ball = (move_object) => ({
    type: ACTIONS.MOVE_BALL,
    payload: {
        x: move_object.x,
        y: move_object.y
    }
});

export const move_object = (move_object) => ({
    type: ACTIONS.MOVE_OBJECT,
    payload: {
        x: move_object.x,
        y: move_object.y
    }
});

export const sendGameControlMsg = (msg) => ({
    type: ACTIONS.SEND_GAME_CONTROL_MSG,
    payload: {
        type: msg.type,
        data: msg.data,
        dest: msg.dest
    }
});

export const sendChatMsg = (msg) => ({
    type: ACTIONS.SEND_CHAT_MSG,
    payload: {
        type: msg.type,
        data: msg.data,
        dest: msg.dest
    }
});

export const sendGameData = (msg) => ({
    type: ACTIONS.SEND_GAME_DATA,
    payload: {
        type: msg.type,
        data: msg.data,
        dest: msg.dest
    }
});

export const receiveGameControlMsg = (msg) => ({
    type: ACTIONS.SEND_GAME_CONTROL_MSG,
    payload: {
        type: msg.type,
        data: msg.data,
        dest: msg.dest
    }
});

export const receiveChatMsg = (msg) => ({
    type: ACTIONS.SEND_CHAT_MSG,
    payload: {
        type: msg.type,
        data: msg.data,
        dest: msg.dest
    }
});

export const receiveGameData = (msg) => ({
    type: ACTIONS.SEND_GAME_DATA,
    payload: {
        type: msg.type,
        data: msg.data,
        dest: msg.dest
    }
});

export const startGame = (msg) => ({
    type: ACTIONS.SEND_GAME_CONTROL_MSG,
    payload: {
        type: msg.type,
        data: msg.data,
        dest: msg.dest
    }
});
