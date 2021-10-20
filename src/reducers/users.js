import {getCookie} from '../helpers';

const defaultState = {
    isSnackbarOpen: false,
    snackbarSeverity: '',
    snackbarMessage: '',
    isAuth: getCookie('isAuth'),
    userId: getCookie('userId'),
    userName: '',
    userEmail: ''
};

const users = (state = defaultState, action) => {
    switch (action.type) {
        case 'SHOW_LOADER':
            return {...state, loading: true};
        case 'HIDE_LOADER':
            return {...state, loading: false};

        case "SHOW_SNACKBAR":
            return {...state,
                isSnackbarOpen: true,
                snackbarSeverity: action.payload.severity,
                snackbarMessage: action.payload.message
            };
        case "HIDE_SNACKBAR":
            return {...state, isSnackbarOpen: false};

        case "SET_COOKIE": {
            const newState = JSON.parse(JSON.stringify(state));
            newState.isAuth = action.cookie;
            return newState;
        }
        case "SAVE_USER_DATA": {
            const newState = JSON.parse(JSON.stringify(state));
            newState.userName = action.payload.userName;
            newState.userEmail = action.payload.userEmail;
            return newState;
        }
        default:
            return state;
    }
};
export default users;