import {combineReducers} from 'redux';
import {ball_reducer} from './ball_reducer';
import {paddle_reducer} from './paddle_reducer';

const rootReducer = combineReducers(
    {
        ball_reducer: ball_reducer, 
        paddle_reducer, 
    }
);

export default rootReducer;
