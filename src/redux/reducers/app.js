import {APP} from "../actions/actionTypes";

const INITIAL_STATE = {
    firstSearch: true,
    darkTheme: false,
    showToast: false,
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
        case APP.SHOW_TOAST:
            return {
                ...prevState,
                showToast: action.showToast
            };
        case APP.SET_ERROR:
            return {
                ...prevState,
                error: action.error
            };
        default:
            return prevState;
    }
}