import {SAVE_AUTH_TOKENS, UPDATE_PROFILE_INFO} from "./Actions";
import {IAppError, IUserProfile} from "../interfaces/interfaces";
import {
    ILoginData,
    IAsyncLoginAction,
    IAuthData,
    ISaveAuthAction,
    ICreateErrorAction,
    ISetProfileAction, IAsyncRegisterAction
} from "./ActionInterfaces";
import store from "../redux/Store";
import {POST_LOGIN, POST_REGISTER} from "./AsyncActions";
import { FAILED_REQUEST } from "./ErrorActions";
import {AxiosResponse} from "axios";
import {IRegistrationRequest} from "../interfaces/dtos";



export function doLogin (loginData: ILoginData): IAsyncLoginAction {
    const requestArgs = loginData;
    return {
        requestArgs,
        type: POST_LOGIN,
        payload:undefined
    } 
}
export function doRegister(registration:IRegistrationRequest):IAsyncRegisterAction{
    return {
        type:POST_REGISTER,
        requestArgs:registration,
        payload:undefined
    }
}
export function saveAuth(authData: IAuthData): ISaveAuthAction{
    const {access_token, refresh_token} = authData;
    return {
        type: SAVE_AUTH_TOKENS,
        payload: {
            tokens:{
                accessToken: access_token,
                refreshToken: refresh_token,
            }
        }
    }
}
export function setActiveProfile(profile:IUserProfile):ISetProfileAction{
    return {
        type: UPDATE_PROFILE_INFO,
        payload: { activeProfile:profile}
    }
}
export function errorResponseHandler(response: AxiosResponse): ICreateErrorAction {
    const {status,statusText, data } = response;
    const restError:IAppError ={ 
        reason:"some reason" , 
        timestamp: Date.now().toString(), 
        uiDescription:"something went wrong",
        uiTitle:"CONNECTION FAILED",
        action:{
            uiLabel:"retry",
            reaction:()=>{} }
    } 
    return {
        type: FAILED_REQUEST,
        payload: {hasErrors:[restError]},
    }
}




