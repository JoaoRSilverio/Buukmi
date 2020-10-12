package models;

import io.ebean.Model;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import play.data.validation.Constraints;

import javax.persistence.Entity;
import javax.persistence.Id;

@NoArgsConstructor
@Entity
@Getter
@Setter
public class Professional extends Model {
    @Id
    private Long id;
    @Constraints.Required
    private String username;
    private String firstName;
    private String lastName;
}
