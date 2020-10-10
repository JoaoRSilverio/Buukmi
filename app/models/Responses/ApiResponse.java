package models.Responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.JsonNode;
import play.libs.Json;

@JsonInclude(JsonInclude.Include.NON_NULL)
public  abstract class  ApiResponse{
    public JsonNode toJson() { return Json.toJson(this);}
}
