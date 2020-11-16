import { ERROR, REQUEST, SUCCESS } from '../actions/permission_actions';

const initialState = {
    isGranted: false,
    isError: false,
    isRequesting: false,
};

const permission = (state = initialState, action) => {
    switch (action.type) {
        case ERROR:
            console.log('ERROR');
            return {
                ...state,
                isGranted: false,
                isError: true,
                isRequesting: false,
            };
        case REQUEST:
            console.log('REQUEST');
            return {
                ...state,
                isGranted: false,
                isError: false,
                isRequesting: true,
            };

        case SUCCESS:
            console.log('SUCCESS');
            return {
                ...state,
                isGranted: true,
                isError: false,
                isRequesting: false,
            };

        default:
            return state;
    }
};

export default permission;
