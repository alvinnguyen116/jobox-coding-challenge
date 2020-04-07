import {fetchRandomDogs} from "../../api";
import {DOGS, FETCH_DOGS} from "./actionTypes";

function initialAction() {
    return {
        type: FETCH_DOGS.INITIAL
    }
}

function successAction({breed,subBreed,res}) {
    return {
        type: FETCH_DOGS.SUCCESS,
        breed,
        subBreed,
        dogs: res.message
    }
}

function failureAction(err) {
    return {
        type: FETCH_DOGS.FAILURE,
        err
    }
}

export function setCurrentBreed(currentBreed) {
    return {
        type: DOGS.SET_CURRENT_BREED,
        currentBreed
    };
}

export function removeFavorite(dog) {
    return {
        type: DOGS.REMOVE_FAVORITE,
        dog
    };
}

export function addFavorite(dog) {
    return {
        type: DOGS.ADD_FAVORITE,
        dog
    };
}

export function setShowFavoriteDogs(showFavoriteDogs) {
    return {
        type: DOGS.SET_SHOW_FAVORITES,
        showFavoriteDogs
    };
}

export function appendCurrentDogs(currentDogs) {
    return {
        type: DOGS.APPEND_CURRENT_DOGS,
        currentDogs
    }
}

export function refreshCurrentDogs() {
    return {
        type: DOGS.REFRESH_CURRENT_DOGS
    }
}

export function getRandomDogs(breed, subBreed=null) {
    return async (dispatch) => {
        dispatch(initialAction());
        try {
            const res = await fetchRandomDogs(breed,subBreed);
            if (res.status === "success") {
                dispatch(successAction({breed,subBreed,res}));
            } else {
                dispatch(failureAction(res));
            }
        } catch (e) {
            dispatch(failureAction(e))
        }
    };
}