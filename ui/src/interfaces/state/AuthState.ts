
export function AuthInitialState(): AuthState  {
   return { tokens: {
        accessToken: undefined,
        refreshToken: undefined,
    },
    uuid: undefined,
}
}

export default interface AuthState {
    tokens:{
        accessToken?: string;
        refreshToken?: string;
    },
    uuid: string
};
