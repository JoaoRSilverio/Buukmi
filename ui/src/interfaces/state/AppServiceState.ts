export function intialServiceState(): IAppServiceState{
    return {
        hasErrors: undefined
    };
}


import{IAppError} from "../interfaces";
export  default interface IAppServiceState {
    hasErrors?: IAppError[];
}



