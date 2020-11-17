package Security;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import io.jsonwebtoken.Claims;
import models.BuukmiUser;

public interface JWTAuthService {
    public String getRefreshToken(BuukmiUser buukmiUser);
    public String getNewSessionToken(BuukmiUser buukmiUser, String refreshToken) throws JWTVerificationException;
    public Claims verifyToken(String token);
    }
