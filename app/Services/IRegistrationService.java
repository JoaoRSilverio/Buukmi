package Services;


import Repos.UserRepo;
import models.BuukmiClient;
import models.Exceptions.ResourceException;
import models.Professional;
import models.Role;

import javax.inject.Inject;
import java.util.List;

public interface IRegistrationService {
    public Long createNewUser(String phoneNr, String password, String email, List<Role> roles);
    public BuukmiClient addClientProfile(Long id, String firstname, String lastname, String username) throws ResourceException;
    public Professional addProfessionalProfile(Long id, String firstName, String lastname, String username) throws  ResourceException;
}
