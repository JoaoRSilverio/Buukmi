package Repos;

import models.Exceptions.ResourceException;
import models.Professional;

public interface ProRepo {
    public Professional getProById(Long id) throws ResourceException;
}
