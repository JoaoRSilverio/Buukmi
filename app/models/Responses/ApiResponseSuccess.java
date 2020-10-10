package models.Responses;

public class ApiResponseSuccess<T> extends  ApiResponse{
    private T data;

    public ApiResponseSuccess(final T data){
        super();
        this.data = data;
    }
}
