package Services;

import Repos.UserRepo;
import Security.PasswordService;
import models.BuukmiClient;
import models.BuukmiUser;
import models.Exceptions.ResourceException;
import models.Professional;
import models.Role;

import javax.inject.Inject;
import java.util.List;

public class RegistrationServiceImpl implements RegistrationService {
    private final UserRepo userRepoImpl;
    @Inject private PasswordService passwordService;

    @Inject
    public RegistrationServiceImpl(final UserRepo userRepoImpl){
        this.userRepoImpl = userRepoImpl;
    }
    @Override
    public Long createNewUser(String phoneNr, String password, String email, List<Role> roles) {
        BuukmiUser unsavedBuukmiUser = new BuukmiUser();
        unsavedBuukmiUser.setPhoneNr(phoneNr);
        unsavedBuukmiUser.setPassword(passwordService.hashAndSalt(password));
        unsavedBuukmiUser.setEmail(email);
        unsavedBuukmiUser.setRoles(roles);
        return userRepoImpl.save(unsavedBuukmiUser);
         }

    @Override
    public BuukmiClient addClientProfile(Long userId, String firstname, String lastname, String username) throws ResourceException {
        BuukmiClient clientProfile = new BuukmiClient();
        clientProfile.setFirstName(firstname);
        clientProfile.setLastName(lastname);
        clientProfile.setUsername(username);

        try {
            BuukmiUser targetBuukmiUser = userRepoImpl.getUserById(userId);
            targetBuukmiUser.setClientProfile(clientProfile);
            userRepoImpl.save(targetBuukmiUser);
            return targetBuukmiUser.getClientProfile();

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
            BuukmiUser targetBuukmiUser = userRepoImpl.getUserById(id);
            targetBuukmiUser.setProfessionalProfile(professionalProfile);
            userRepoImpl.save(targetBuukmiUser);
            return targetBuukmiUser.getProfessionalProfile();
        } catch (ResourceException e){
            return null;
        }
    }
}
