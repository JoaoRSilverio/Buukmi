package modules;

import Repos.*;
import com.google.inject.AbstractModule;

public class RepositoriesModule extends AbstractModule {
    @Override
    protected void configure() {
        bind(BuukmiClientRepo.class).to(BuukmiClientRepoImpl.class);
        bind(ProRepo.class).to(ProRepoImpl.class);
        bind(RoleRepo.class).to(RoleRepoImpl.class);
        bind(UserRepo.class).to(UserRepoImpl.class);
    }
}
