import IProfileState, { ProfileInitialState } from "./ProfileState";
import AuthState, { AuthInitialState } from "./AuthState";
import IAppServiceState, {intialServiceState} from "./AppServiceState";
export const InitialAppState: IAppState = {
    Auth: AuthInitialState(),
    Profile: ProfileInitialState(),
    AppService: intialServiceState(),

}
export default interface IAppState {
    Auth: AuthState;
    Profile: IProfileState;
    AppService: IAppServiceState;
}

