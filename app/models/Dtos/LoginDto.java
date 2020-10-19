package models.Dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@JsonInclude
@Getter
@Setter
public class LoginDto {
    public String phoneNr;
    public String password;
}
