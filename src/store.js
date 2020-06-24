import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import gameReducer from './reducers/game_reducer';

const middleware = [thunk];

const initialState = {};

const rootReducer = combineReducers({
    gameReducer: gameReducer
});

const store = createStore(
    rootReducer, 
    initialState, 
    applyMiddleware(...middleware)
);

export default store;
