export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const GRANTED = 'GRANTED';
export const ERROR = 'ERROR';

export const permissionRequest = () => {
    return {
        type: REQUEST,
    };
};

export const permissionSuccess = () => {
    return {
        type: SUCCESS,
    };
};

export const permissionGranted = () => {
    return {
        type: GRANTED,
    };
};

export const permissionError = () => {
    return {
        type: ERROR,
    };
};
