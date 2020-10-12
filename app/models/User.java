package models;
import javax.persistence.*;

import io.ebean.*;
import lombok.Getter;
import lombok.Setter;
import play.data.format.*;
import play.data.validation.*;
import java.util.*;
@Entity
@Getter
@Setter
public class User extends Model {
    @Id
    private Long id;
    @Constraints.Required
    private String phoneNr;
    @Constraints.Required
    private String password;

    private String email;
    private List<Role> roles;
    @OneToOne
    private BuukmiClient clientProfile;
    @OneToOne
    private Professional professionalProfile;

    public static final Finder<Long, User> find = new Finder<>(User.class);
}
