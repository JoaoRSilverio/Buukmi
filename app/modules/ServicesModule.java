package modules;

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
    }
}
