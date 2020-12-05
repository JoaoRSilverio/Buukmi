import IAppServiceState from "../interfaces/state/AppServiceState";
import {ILoginRequest, IRegistrationRequest} from "../interfaces/dtos";
import ProfileState from "../interfaces/state/ProfileState";
import IProfileState from "../interfaces/state/ProfileState";

export interface IAction { 
    type: string; 
    payload: any };
export interface IAsyncAction extends IAction{
    requestArgs: any;
}
export interface IAsyncLoginAction extends IAsyncAction {
    requestArgs: ILoginRequest;
}
export interface IAsyncRegisterAction extends IAsyncAction {
    requestArgs: IRegistrationRequest;
}
export interface ISaveAuthAction extends IAction {
    payload: {
        tokens: {
            accessToken?: string;
            refreshToken?: string;
        }
    }
}
export interface ICreateErrorAction extends IAction {
    payload: IAppServiceState;
}
export interface ISetProfileAction extends IAction{
    payload: IProfileState;
}
// 
export interface ILoginData {
    phoneNr: string;
    password: string;
}

export interface IAuthData {
        access_token: string;
      //  expires_in: number;
        refresh_token: string;
      //  token_type: string
}