import {put, takeEvery,takeLatest,takeLeading} from "redux-saga/effects";
import {POST_LOGIN, POST_REGISTER} from "../actions/AsyncActions";
import { IAsyncLoginAction } from "../actions/ActionInterfaces";
import { saveAuth, errorResponseHandler } from "../actions/ActionCreators";
import axios from "axios";
import {loginSaga, registerSaga} from "../services/rest/AuthRestUtil";
import {ILoginResponse} from "../interfaces/dtos";


function* logoutSaga(){
    console.log("ran a saga, exampleSaga");
}

export default function *  rootSaga(){
   yield takeLeading(POST_LOGIN, loginSaga)
   yield takeLeading(POST_REGISTER, registerSaga)
   //yield takeLeading(LOGOUT, logoutSaga)
}