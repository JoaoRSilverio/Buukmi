package models;
import javax.persistence.*;

import io.ebean.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import play.data.format.*;
import play.data.validation.*;
import java.util.*;
@NoArgsConstructor
@Getter
@Setter
@Entity
public class BuukmiClient extends Model{
    @Id
    private Long id;
    private String firstName;
    private String lastName;
    @Constraints.Required
    private String username;

}
