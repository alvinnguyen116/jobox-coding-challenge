import {FETCH_BREEDS} from "../actions/actionTypes";

const INITIAL_STATE = {
    inProgress: false,
    breeds: [],
    err: null
};

/**
 * @param breeds
 * @returns {[]}
 * @desc Formats the object from the Dogs Breeds endpoint
 * to an array of breeds and sub-breeds.
 * Object to format: https://dog.ceo/api/breeds/list/all
 */
function formatBreeds(breeds) {
    const result = [];
    Object.entries(breeds).forEach(([breed,subBreeds]) => {
        if (subBreeds.length) {
            subBreeds.forEach(subBreed => result.push({breed, subBreed}));
        } else {
            result.push({breed, subBreed: null});
        }
    });
    return result;
}

export default (prevState = INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_BREEDS.INITIAL:
            return {
                ...prevState,
                inProgress: true,
                breeds: [],
                err: null
            };
        case FETCH_BREEDS.SUCCESS:
            const breeds = formatBreeds(action.breeds);
            return {
                ...prevState,
                inProgress: false,
                breeds,
                err: null
            };
        case FETCH_BREEDS.FAILURE:
            return {
                ...prevState,
                inProgress: false,
                breeds: [],
                err: action.err
            };
        default:
            return prevState;
    }
}