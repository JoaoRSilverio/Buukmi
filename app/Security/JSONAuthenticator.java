package Security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.typesafe.config.Config;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import models.User;
import play.api.Configuration;
import play.mvc.Http;
import play.mvc.Result;
import play.mvc.Security;

import javax.inject.Inject;
import javax.validation.valueextraction.Unwrapping;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.Optional;

public class JSONAuthenticator extends Security.Authenticator {
    @Inject private Config config;
    @Inject private JWTAuthService jwtAuthService;

    @Override
    public Optional<String> getUsername(Http.Request req) {
        try {
            Optional<String> token = req.header("Authorization");
            DecodedJWT decodedJWT = jwtAuthService.verifyToken(token.get());
            Optional<String> email = Optional.ofNullable(decodedJWT.getHeaderClaim("email").asString());
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
