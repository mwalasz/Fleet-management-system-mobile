export const POST_REQUEST = 'POST_REQUEST';
export const POST_SUCCESS = 'POST_SUCCESS';
export const POST_ERROR = 'POST_ERROR';
export const POST_RESET = 'POST_RESET';

export const postRequest = () => {
    return {
        type: POST_REQUEST,
    };
};

export const postSuccessful = () => {
    return {
        type: POST_SUCCESS,
    };
};

export const postError = () => {
    return {
        type: POST_ERROR,
    };
};

export const postReset = () => {
    return {
        type: POST_RESET,
    };
};
