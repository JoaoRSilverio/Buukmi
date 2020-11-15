package Repos;

import models.Exceptions.ResourceException;
import models.BuukmiUser;

public interface UserRepo {
    public BuukmiUser getUserByNr(String phoneNr) throws  ResourceException;
    public BuukmiUser getUserByEmail(String email) throws ResourceException;
    public BuukmiUser getUserById(Long id) throws  ResourceException;
    public Long save(BuukmiUser buukmiUser);
    }
