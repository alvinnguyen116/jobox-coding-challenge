import {fetchBreeds} from "../../api";
import {FETCH_BREEDS} from "./actionTypes";

function initialAction() {
    return {
        type: FETCH_BREEDS.INITIAL
    }
}

function successAction(res) {
    return {
        type: FETCH_BREEDS.SUCCESS,
        breeds: res.message
    }
}

function failureAction(err) {
    return {
        type: FETCH_BREEDS.FAILURE,
        err
    }
}

export default () => {
    return async (dispatch) => {
        dispatch(initialAction());
        try {
            const res = await fetchBreeds();
            if (res.status === "success") {
                dispatch(successAction(res));
            } else {
                dispatch(failureAction(res));
            }
        } catch (e) {
            dispatch(failureAction(e))
        }
    };
}