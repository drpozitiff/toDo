const defaultState = {
    bases: [],
    currentBase: '',
    fishInfo: []
};

const fish = (state=defaultState, action) =>  {
    switch (action.type) {
        case "GET_BASES":
            return {...state, bases: action.payload};
        case "GET_FISH_INFO":
            return {...state, fishInfo: action.payload};
        case "SET_CURRENT_BASE":
            return {...state, currentBase: action.payload};
        default:
            return state;
    }
};

export default fish;