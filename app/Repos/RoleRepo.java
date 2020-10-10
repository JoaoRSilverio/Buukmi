package Repos;

import io.ebean.Ebean;
import models.Role;

import java.util.List;
import java.util.UUID;

public class RoleRepo {
    public List<Role> getRoles(){
        List<Role> roles = Role.find.all();
        return roles;
    }

    public Long save(Role role){
      final Role dbRole = Role.find.byId(role.getId());
      if(dbRole != null){
          role.update();
      } else {
          role.save();
      }
      return role.getId();
    }
}
