package Security;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordServiceImpl implements PasswordService {


    @Override
    public String hashAndSalt(String password) {
        String salt = BCrypt.gensalt(5);
        return BCrypt.hashpw(password, salt);
    }

    @Override
    public boolean isPwdValid(String savedPassword, String password) {
        return BCrypt.checkpw(password, savedPassword);
    }
}
