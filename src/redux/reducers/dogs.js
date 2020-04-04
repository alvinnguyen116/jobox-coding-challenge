import {FETCH_DOGS, DOGS} from "../actions/actionTypes";
import {updateDogs, randomDogs} from "../../util/util";

const INITIAL_STATE = {
    inProgress: false,
    dogs: {},
    pageSize: 9,
    currentBreed: null,
    currentDogs: [],
    favoriteDogs: [],
    showingFavoriteDogs: false,
    err: null
};

export default (prevState = INITIAL_STATE, action) => {
    let {dogs, pageSize, currentBreed, currentDogs, favoriteDogs} = prevState;
    switch(action.type) {
        case FETCH_DOGS.INITIAL:
            return {
                ...prevState,
                inProgress: true,
                err: null
            };
        case FETCH_DOGS.SUCCESS:
            dogs = updateDogs(prevState.dogs, action);
            return {
                ...prevState,
                inProgress: false,
                dogs,
                err: null
            };
        case FETCH_DOGS.FAILURE:
            return {
                ...prevState,
                inProgress: false,
                err: action.err
            };
        case DOGS.SET_CURRENT_BREED:
            return  {
                ...prevState,
                currentBreed: action.currentBreed,
                showingFavoriteDogs: false, // reset
                currentDogs: [] // reset
            };
        case DOGS.GET_RANDOM_DOGS:
            currentDogs = randomDogs(pageSize, Array.from(dogs[currentBreed]), currentDogs);
            return {
                ...prevState,
                currentDogs
            };
        case DOGS.APPEND_CURRENT_DOGS:
            return {
                ...prevState,
                currentDogs: [...currentDogs, ...action.currentDogs]
            };
        case DOGS.ADD_FAVORITE:
            return {
                ...prevState,
                favoriteDogs: [...favoriteDogs, action.dog]
            };
        case DOGS.REMOVE_FAVORITE:
            const newFavoriteDogs = [...favoriteDogs];
            const index = newFavoriteDogs.findIndex(val => val === action.dog);
            if (index > -1) {
                newFavoriteDogs.splice(index,1);
            }
            return {
                ...prevState,
                favoriteDogs: newFavoriteDogs
            };
        case DOGS.SET_SHOW_FAVORITES:
            if (action.showFavoriteDogs) {
                return {
                    ...prevState,
                    showingFavoriteDogs: true,
                    currentDogs: favoriteDogs.slice(0,pageSize)
                };
            }
            currentDogs = [];
            if (currentBreed && dogs[currentBreed]) {
                currentDogs = Array.from(dogs[currentBreed]).slice(0,pageSize);
            }
            return {
                ...prevState,
                showingFavoriteDogs: false,
                currentDogs
            };
        default:
            return prevState;
    }
}