package Security;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import models.User;
import play.mvc.*;
import com.auth0.jwt.JWTVerifier;

import javax.inject.Inject;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.Optional;
import java.util.concurrent.CompletionStage;

// https://github.com/auth0/java-jwt
// this is an injector in the end.
public class GeneralAuthentication {

    public @interface Authenticated {
        Class<? extends Security.Authenticator> value() default Security.Authenticator.class;
        Class<? extends Security.Authenticator>[] values() default {};
    }

    public static class AuthenticatedAction extends Action<Authenticated>{
       // @Inject private User

        @Override
        public CompletionStage<Result> call(Http.Request req) {
            return null;
        }
    }
}
