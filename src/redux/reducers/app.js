import {APP} from "../actions/actionTypes";

const INITIAL_STATE = {
    firstSearch: true,
    darkTheme: true,
    singleView: false,
    hasError: false,
    error: null
};

export default (prevState = INITIAL_STATE, action) => {
    switch(action.type) {
        case APP.SET_FIRST_SEARCH:
            return {
                ...prevState,
                firstSearch: action.firstSearch
            };
        case APP.SET_DARK_THEME:
            return {
                ...prevState,
                darkTheme: action.darkTheme
            };
        case APP.SET_SINGLE_VIEW:
            return {
                ...prevState,
                singleView: action.singleView
            };
        case APP.SET_ERROR:
            return {
                ...prevState,
                hasError: true,
                error: action.error
            };
        default:
            return prevState;
    }
}