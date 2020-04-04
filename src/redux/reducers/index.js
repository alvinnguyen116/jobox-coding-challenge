import {combineReducers} from "redux";
import dogs from "./dogs";
import breeds from "./breeds";
import app from "./app";

export default combineReducers({dogs, breeds, app});