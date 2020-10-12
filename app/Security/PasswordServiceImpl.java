package Security;

import Repos.UserRepo;
import models.User;

import javax.inject.Inject;

public class PasswordServiceImpl implements PasswordService {
    private UserRepo userRepoImpl;
    @Inject public PasswordServiceImpl(final UserRepo userRepoImpl){
        this.userRepoImpl = userRepoImpl;
    }
    @Override
    public String hashAndSalt(String password) {
        return null;
    }

    @Override
    public boolean isPwdValid(User user, String password) {

        return false;
    }
}
