package Repos;

import models.Role;

import java.util.List;

public interface RoleRepo {
    public List<Role> getRoles();
    public Long save(Role role);
}
