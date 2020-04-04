import {fetchDogs} from "../../api";
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

export function getRandomDogs() {
    return {
        type: DOGS.GET_RANDOM_DOGS
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

export function showFavoriteDogs() {
    return {
        type: DOGS.SHOW_FAVORITES
    };
}

export function appendCurrentDogs(currentDogs) {
    return {
        type: DOGS.APPEND_CURRENT_DOGS,
        currentDogs
    }
}

export function getDogs(breed, subBreed=null) {
    return async (dispatch) => {
        dispatch(initialAction());
        try {
            const res = await fetchDogs(breed,subBreed);
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