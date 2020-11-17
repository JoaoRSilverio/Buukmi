package Security;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.typesafe.config.Config;
import io.jsonwebtoken.Claims;
import play.mvc.Http;
import play.mvc.Result;
import play.mvc.Security;

import javax.inject.Inject;
import java.util.Optional;

public class JSONAuthenticator extends Security.Authenticator {
    @Inject private Config config;
    @Inject private JWTAuthService jwtAuthService;

    @Override
    public Optional<String> getUsername(Http.Request req) {
        try {
            Optional<String> token = req.header("Authorization");
            Claims decodedJWT = jwtAuthService.verifyToken(token.get());
            Optional<String> email = Optional.ofNullable(decodedJWT.get("email").toString());
            return email;
        }catch (JWTVerificationException exception){
            return Optional.empty();
        }
    }


    @Override
    public Result onUnauthorized(Http.Request req) {
        return ok(views.html.index.render());
    }


}
