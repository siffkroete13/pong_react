import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import gameReducer from './reducers/gameReducer';

const middleware = [thunk];

const initialState = {};

const rootReducer = combineReducers({
    gameReducer: gameReducer
});

const store = createStore(
    rootReducer, 
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;
