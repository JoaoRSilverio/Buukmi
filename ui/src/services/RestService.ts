import {IRegistrationRequest, IRegistrationResponse} from "../interfaces/dtos";
import axios, {AxiosInstance, AxiosResponse} from "axios";
import {CURRENT_BACKEND} from "../appConfig/Constants";
import {ROUTES} from "../appConfig/Routes";

export default class RestService {
    static async register(http: AxiosInstance,data:IRegistrationRequest):Promise<IRegistrationResponse>{
    const response:AxiosResponse<IRegistrationResponse> = await http.post(ROUTES.POST_REGISTER,data);
    if(response.status == 200) {
        return response.data;
    }
    }
}