package Repos;

import io.ebean.Ebean;
import io.ebean.ExpressionList;
import models.Exceptions.ResourceException;
import models.User;

import java.util.UUID;

public class UserRepo {
public User getUserByEmail(String email) throws ResourceException{
    User user = Ebean.find(User.class).where().eq("user.email", email).findOne();
    if(user == null) throw new ResourceException("no such user", user.getId());
    return user;
}

public User getUserById(Long id) throws  ResourceException{
    User user = Ebean.find(User.class, id);
    if(user == null) throw new ResourceException("no such user", id);
    return user;
}



public Long save(User user){
    final User dbUser = Ebean.find(User.class, user.getId());
    if(dbUser.getId() == null){
       user.save();
    } else {
        user.update();
    }
    return user.getId();
}
}
