package Security;


import play.mvc.*;

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
        private Security.Authenticator authenticator;
        public AuthenticatedAction(Security.Authenticator auth){
            this.authenticator = auth;
        }
        @Override
        public CompletionStage<Result> call(Http.Request req) {

            return delegate.call(req);

        }

    }
}
