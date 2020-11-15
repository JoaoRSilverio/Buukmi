package models.Dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;
import models.BuukmiClient;
import play.data.validation.Constraints;

import javax.persistence.Id;

@JsonInclude
@Getter
@Setter
public class ClientProfileDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    public ClientProfileDto(BuukmiClient client){
        this.id = client.getId();
        this.firstName = client.getFirstName();
        this.lastName = client.getLastName();
        this.username = client.getUsername();

    }
}
