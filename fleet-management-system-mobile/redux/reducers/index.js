import { combineReducers } from 'redux';
import auth from './authorization_reducer';
import post from './post_reducer';
import permission from './permission_reducer';

const rootReducer = combineReducers({
    auth,
    post,
    permission,
});

export default rootReducer;
