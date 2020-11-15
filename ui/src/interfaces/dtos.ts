export interface  IRegistrationRequest {
    phoneNr: string;
    password: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
}
export interface IRegistrationResponse{
    id: string;
    firstName : string;
    lastName : string;
    username : string;
}