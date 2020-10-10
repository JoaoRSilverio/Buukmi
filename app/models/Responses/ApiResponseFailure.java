package models.Responses;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiResponseFailure extends ApiResponse{
    private String errorMsg;
    private String errorCode;
    public ApiResponseFailure(String errorMsg, String errorCode){
       this.setErrorCode(errorCode);
        this.setErrorMsg(errorMsg);
    }
}
