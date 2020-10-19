package Security;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import models.Exceptions.ResourceException;
import models.User;

public interface JWTAuthService {
    public String getRefreshToken(User user);
    public String getNewSessionToken(User user, String refreshToken) throws JWTVerificationException;
    public DecodedJWT verifyToken(String token);
    }
