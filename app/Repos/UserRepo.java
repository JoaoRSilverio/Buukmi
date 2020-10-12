package Repos;

import models.Exceptions.ResourceException;
import models.User;

public interface UserRepo {
    public User getUserByEmail(String email) throws ResourceException;
    public User getUserById(Long id) throws  ResourceException;
    public Long save(User user);
    }
