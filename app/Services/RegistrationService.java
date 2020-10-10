package Services;

import Repos.UserRepo;
import models.BuukmiClient;
import models.Exceptions.ResourceException;
import models.Professional;
import models.Role;
import models.User;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;

public class RegistrationService implements  IRegistrationService{
    private final UserRepo userRepo;

    @Inject
    public RegistrationService(final UserRepo userRepo){
        this.userRepo = userRepo;
    }
    @Override
    public Long createNewUser(String phoneNr, String password, String email, List<Role> roles) {
        User unsavedUser = new User();
        unsavedUser.setPhoneNr(phoneNr);
        unsavedUser.setPassword(password);
        unsavedUser.setEmail(email);
        unsavedUser.setRoles(roles);
        return userRepo.save(unsavedUser);
         }

    @Override
    public BuukmiClient addClientProfile(Long userId, String firstname, String lastname, String username) throws ResourceException {
        BuukmiClient clientProfile = new BuukmiClient();
        clientProfile.setFirstName(firstname);
        clientProfile.setLastName(lastname);
        clientProfile.setUsername(username);

        try {
            User targetUser = userRepo.getUserById(userId);
            targetUser.setClientProfile(clientProfile);
            userRepo.save(targetUser);
            return targetUser.getClientProfile();

        }catch (ResourceException e){
            return null;
        }
    }

    @Override
    public Professional addProfessionalProfile(Long id, String firstName, String lastname, String username) throws ResourceException {
        Professional professionalProfile = new Professional();
        professionalProfile.setUsername(username);
        professionalProfile.setFirstName(firstName);
        professionalProfile.setLastName(lastname);

        try {
            User targetUser = userRepo.getUserById(id);
            targetUser.setProfessionalProfile(professionalProfile);
            userRepo.save(targetUser);
            return targetUser.getProfessionalProfile();
        } catch (ResourceException e){
            return null;
        }
    }
}
