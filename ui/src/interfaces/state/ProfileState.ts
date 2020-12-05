import { IUserProfile } from "../interfaces";
export function ProfileInitialState(): IProfileState {
    return {
        activeProfile: {
            username:"",
            lastName:"",
            firstName:""
        }
    }

}
export default interface IProfileState {
   activeProfile: IUserProfile,
}