import {
    POST_REQUEST,
    POST_SUCCESS,
    POST_ERROR,
    POST_RESET,
} from '../actions/post_actions';

const initialState = {
    isSending: false,
    isError: false,
    isSent: false,
    isSuccess: false,
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_REQUEST:
            console.log('POST_REQUEST');
            return {
                ...state,
                isSending: true,
                isError: false,
                isSent: false,
            };

        case POST_SUCCESS:
            console.log('POST_SUCCESS');
            return {
                ...state,
                isSending: false,
                isError: false,
                isSent: true,
                isSuccess: true,
            };

        case POST_ERROR:
            console.log('POST_ERROR');
            return {
                ...state,
                isSending: false,
                isError: true,
                isSent: true,
                isSuccess: false,
            };

        case POST_RESET:
            console.log('POST_RESET');
            return {
                ...state,
                isSending: false,
                isError: false,
                isSent: false,
                isSuccess: false,
            };

        default:
            return state;
    }
};

export default postReducer;
