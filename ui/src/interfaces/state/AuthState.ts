import {ROLES} from "../../appConfig/Constants";

export function AuthInitialState(): AuthState  {
   return { tokens: {
        accessToken: undefined,
        refreshToken: undefined,
    },
       roles:[ROLES.ADMIN],
    uuid: undefined,
}
}

export default interface AuthState {
    tokens:{
        accessToken?: string;
        refreshToken?: string;

    },
    roles:ROLES[];
    uuid: string
}
