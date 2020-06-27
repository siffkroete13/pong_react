import {
    ACTIONS,
    move_left_paddle,
    move_right_paddle,
    move_ball,
    move_object,
    sendGameControlMsg,
    sendChatMsg,
    sendGameData,
    startGame
} from '../actions/';

const initialState = {
    connectionState: 'disconnected',
    gameState: 'stop'
}

const gameReducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTIONS.SEND_GAME_CONTROL_MSG:
        {
            console.log('SEND_GAME_CONTROL_MSG in gameReducer, state: ', state);
            return state;
        }
        case ACTIONS.RECEIVE_GAME_CONTROL_MSG:
        {
            console.log('RECEIVE_GAME_CONTROL_MSG in gameReducer, state: ', state);
            return state;
        }
        default:
            return state;
    }
}

export default gameReducer;