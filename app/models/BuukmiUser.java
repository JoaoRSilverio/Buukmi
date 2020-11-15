package models;
import javax.persistence.*;
import javax.validation.Constraint;

import io.ebean.*;
import lombok.Getter;
import lombok.Setter;
import play.data.validation.*;
import java.util.*;
@Entity
@Getter
@Setter
public class BuukmiUser extends Model {
    @Id
    private Long id;
    @Constraints.Required
    private String phoneNr;
    @Constraints.Required
    private String password;

    private String email;
    private List<Role> roles;
    @OneToOne(cascade = CascadeType.ALL)
    private BuukmiClient clientProfile;
    @OneToOne(cascade = CascadeType.ALL)
    private Professional professionalProfile;

    public static final Finder<Long, BuukmiUser> find = new Finder<>(BuukmiUser.class);
}
