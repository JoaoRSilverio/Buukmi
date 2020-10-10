package Repos;

import io.ebean.Ebean;
import models.BuukmiClient;
import models.Exceptions.ResourceException;

public class BuukmiClientRepo {
    public BuukmiClient getClientById(Long id) throws ResourceException{
        BuukmiClient client = Ebean.find(BuukmiClient.class, id);
        if(client == null) {
            throw new ResourceException("no such client", id);
        }
        return client;
    }
}
