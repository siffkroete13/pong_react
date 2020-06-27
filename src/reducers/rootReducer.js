import {combineReducers} from 'redux';
import {ball_reducer} from './ball_reducer';
import {paddle_reducer} from './paddle_reducer';
import {gameReducer} from './gameReducer';
import {dnd_reducer} from './dnd_reducer';

const rootReducer = combineReducers(
    {
        ball_reducer: ball_reducer, 
        paddle_reducer: paddle_reducer,
        gameReducer: gameReducer,
        dnd_reducer: dnd_reducer 
    }
);

export default rootReducer;
