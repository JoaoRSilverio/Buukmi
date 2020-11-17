import {ILoginRequest, ILoginResponse, IRegistrationRequest, IRegistrationResponse} from "../../interfaces/dtos";
import axios, {AxiosInstance, AxiosResponse} from "axios";
import {ROUTES} from "../../appConfig/Routes";
import {IAsyncLoginAction, IAsyncRegisterAction} from "../../actions/ActionInterfaces";
import {put } from "redux-saga/effects";
import {saveAuth, setActiveProfile} from "../../actions/ActionCreators";
import store from "../../redux/Store";


const POST = async (route:ROUTES, data:any):Promise<AxiosResponse<any>> =>{
    const authState = store.getState().Auth;
    const response:AxiosResponse = await axios.post(route,data,{
        headers:{
            "Authorization":`Bearer ${authState.tokens.accessToken}`
        }
    });

    return response;
}
async function  refreshToken(): Promise<void> {

}
function  validation(response:AxiosResponse){
    //;
}

    export async function register(http: AxiosInstance,data:IRegistrationRequest):Promise<IRegistrationResponse>{
    const response:AxiosResponse<IRegistrationResponse> = await http.post(ROUTES.POST_REGISTER,data);
    if(response.status == 200) {
        return response.data;
    }
    }

    export async function login(http:AxiosInstance, data:ILoginRequest):Promise<ILoginResponse>{
        const response: AxiosResponse<ILoginResponse> = await POST(ROUTES.POST_LOGIN,data);
        if(response.status == 200){
            return response.data;
        }
    }

// SAGAS must be added to the main Saga file with the target action
export function* loginSaga(action: IAsyncLoginAction){
    const response: ILoginResponse = yield login(axios,action.requestArgs);
    yield put(saveAuth({access_token:response.token,refresh_token:response.refreshToken}));
    yield put(setActiveProfile(response.profile));

}
export function* registerSaga(action: IAsyncRegisterAction){
    const response: IRegistrationResponse = yield  register(axios, action.requestArgs);
    yield put(saveAuth({access_token:response.token,refresh_token:response.refreshToken}))

}
