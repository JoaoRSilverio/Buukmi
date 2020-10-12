package Repos;

import io.ebean.Ebean;
import models.Exceptions.ResourceException;
import models.Professional;

public class ProRepoImpl implements ProRepo{
    public Professional getProById(Long id) throws ResourceException {
        final Professional pro = Ebean.find(Professional.class, id);
        if(pro == null) throw new ResourceException("no such professional",id);
        return pro;
    }
}
