import {getCookie} from '../helpers';

const defaultState = {
    isFormOpen: false,
    isSnackbarOpen: false,
    snackbarSeverity: '',
    snackbarMessage: '',
    isAuth: getCookie('isAuth'),
    userName: getCookie('username'),
    userEmail: getCookie('email')
};

const users = (state = defaultState, action) => {
    switch (action.type) {
        case 'OPEN_FORM': {
            const newState = JSON.parse(JSON.stringify(state));
            newState.isFormOpen = true;
            return newState;
        }
        case 'CLOSE_FORM': {
            const newState = JSON.parse(JSON.stringify(state));
            newState.isFormOpen = false;
            newState.editableArticle = {};
            return newState;
        }
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
        case "SHOW_USER_DATA": {
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