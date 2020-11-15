package Security;

public interface PasswordService {
    public String hashAndSalt(String password);
    public boolean isPwdValid(String savedPassword, String password);

}
