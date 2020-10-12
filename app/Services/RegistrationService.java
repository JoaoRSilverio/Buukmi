package Services;


import models.BuukmiClient;
import models.Exceptions.ResourceException;
import models.Professional;
import models.Role;

import java.util.List;

public interface RegistrationService {
    public Long createNewUser(String phoneNr, String password, String email, List<Role> roles);
    public BuukmiClient addClientProfile(Long id, String firstname, String lastname, String username) throws ResourceException;
    public Professional addProfessionalProfile(Long id, String firstName, String lastname, String username) throws  ResourceException;
}
