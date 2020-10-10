package models;

import io.ebean.Finder;
import io.ebean.Model;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import java.time.Instant;
import java.util.UUID;
@Entity
@Getter
@Setter
public class Role extends Model {
    private Long id;
    private String name;
    private Instant createdAt;
    @OneToOne(mappedBy = "user")
    private UUID createdBy;

public static final Finder<Long, Role> find = new Finder<>(Role.class);
}
