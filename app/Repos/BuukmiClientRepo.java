package Repos;

import models.BuukmiClient;
import models.Exceptions.ResourceException;

public interface BuukmiClientRepo {
    public BuukmiClient getClientById(Long id) throws ResourceException;
}
