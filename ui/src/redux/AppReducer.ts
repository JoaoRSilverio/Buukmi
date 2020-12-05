import IAppState, {InitialAppState} from "../interfaces/state/AppState";
import {
    SAVE_AUTH_TOKENS, UPDATE_PROFILE_INFO
} from "../actions/Actions";
import AuthState from "../interfaces/state/AuthState";
import ProfileState from "../interfaces/state/ProfileState";
import IAppServiceState from "../interfaces/state/AppServiceState";
import { IAction } from "../actions/ActionInterfaces";
import { FAILED_REQUEST } from "../actions/ErrorActions";

export const AppReducer = (state: IAppState = InitialAppState, action: IAction):IAppState => {
    console.log(action);
    const appState: IAppState = {
        Auth: AuthReducer(state.Auth, action),
        Profile: ProfileReducer(state.Profile, action),
        AppService: AppServiceReducer(state.AppService,action),
        
    }
    return appState;
}
const AppServiceReducer = (state: IAppServiceState, action: IAction) => {
    switch(action.type){
        case FAILED_REQUEST:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}
const AuthReducer = (state: AuthState, action: IAction):AuthState => {
    switch(action.type) {
        case SAVE_AUTH_TOKENS:
        // case REGISTER:
        // case REFRESH_TOKEN:
        // case LOGOUT:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}
const ProfileReducer = (state: ProfileState, action: IAction):ProfileState => {
    switch(action.type){
        //case UPDATE_NOTIFICATION_SETTINGS:
        case UPDATE_PROFILE_INFO:
        //case SET_FAVOURITE_ADDRESS:
            return {
                ...state,
                ...action.payload
            }
        default: 
        return state;
    }
}

export default AppReducer;