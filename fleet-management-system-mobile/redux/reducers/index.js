import { combineReducers } from 'redux';
import authorizationReducer from './authorization_reducer';
import postReducer from './post_reducer';

const rootReducer = combineReducers({
    authorizationReducer,
    postReducer,
});

// const rootReducer = authorizationReducer;

export default rootReducer;
