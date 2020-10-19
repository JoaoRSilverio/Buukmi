package Security;

import models.User;

public interface PasswordService {
    public String hashAndSalt(String password);
    public boolean isPwdValid(String savedPassword, String password);

}
