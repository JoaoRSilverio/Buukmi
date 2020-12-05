import {createStore, applyMiddleware} from "redux";
import AppReducer from "../redux/AppReducer";
import createSagaMiddleware from "redux-saga";
import Sagas from "./Sagas";

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
    AppReducer,
    applyMiddleware(sagaMiddleware));
sagaMiddleware.run(Sagas);
console.log("initial app state", store.getState());
export default store;