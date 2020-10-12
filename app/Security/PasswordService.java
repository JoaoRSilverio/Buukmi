package Security;

import models.User;

public interface PasswordService {
    public String hashAndSalt(String password);
    public boolean isPwdValid(User user, String password);

}
