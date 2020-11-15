package Repos;

import io.ebean.Ebean;
import models.BuukmiUser;
import models.Exceptions.ResourceException;

public class UserRepoImpl implements UserRepo {
    public BuukmiUser getUserByEmail(String email) throws ResourceException{
    BuukmiUser buukmiUser = Ebean.find(BuukmiUser.class).where().eq("user.email", email).findOne();
    if(buukmiUser == null) throw new ResourceException("no such user", buukmiUser.getId());
    return buukmiUser;
}
public BuukmiUser getUserByNr(String phoneNr) throws  ResourceException {
        try {
            BuukmiUser buukmiUser = Ebean.find(BuukmiUser.class).where().eq("user.phoneNr", phoneNr).findOne();
            return buukmiUser;
        } catch (Exception exception){
            throw new ResourceException("no such user");
        }
}
public BuukmiUser getUserById(Long id) throws  ResourceException{
    BuukmiUser buukmiUser = Ebean.find(BuukmiUser.class, id);
    if(buukmiUser == null) throw new ResourceException("no such user", id);
    return buukmiUser;
}



public Long save(BuukmiUser buukmiUser){
    if(buukmiUser.getId() == null){
        buukmiUser.save();
    } else {
        buukmiUser.update();
    }
    return buukmiUser.getId();
}
}
