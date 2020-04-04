import {APP} from "./actionTypes";

export function setFirstSearch(firstSearch) {
    return {
        type: APP.SET_FIRST_SEARCH,
        firstSearch
    };
}

export function setDarkTheme(darkTheme) {
    return {
        type: APP.SET_DARK_THEME,
        darkTheme
    };
}

export function setError(error) {
    return {
        type: APP.SET_ERROR,
        error
    }
}

export function setSingleView(singleView) {
    return {
        type: APP.SET_SINGLE_VIEW,
        singleView
    };
}