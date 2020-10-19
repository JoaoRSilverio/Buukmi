package modules;

import Security.JWTAuthService;
import Security.JWTAuthServiceImpl;
import Security.PasswordService;
import Security.PasswordServiceImpl;
import Services.RegistrationService;
import Services.RegistrationServiceImpl;
import com.google.inject.AbstractModule;

public class ServicesModule extends AbstractModule {
    @Override
    protected void configure() {
       bind(RegistrationService.class).to(RegistrationServiceImpl.class);
       bind(PasswordService.class).to(PasswordServiceImpl.class);
       bind(JWTAuthService.class).to(JWTAuthServiceImpl.class);
    }
}
