const defaultState = {
    bases: [],
    currentBase: '',
    fishInfo: [],
    userFishInfo: []
};

const fish = (state=defaultState, action) =>  {
    switch (action.type) {
        case "GET_BASES":
            return {...state, bases: action.payload, currentBase: action.payload[0]?.baseId};
        case "GET_FISH_INFO":
            return {...state, fishInfo: action.payload};
        case "GET_USER_FISH_INFO":
            return {...state, userFishInfo: action.payload};
        case "RESET_USER_FISH_INFO":
            return {...state, userFishInfo: action.payload};
        case "SET_CURRENT_BASE":
            return {...state, currentBase: action.payload};
        default:
            return state;
    }
};

export default fish;