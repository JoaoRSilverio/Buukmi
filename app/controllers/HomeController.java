package controllers;

import Repos.RoleRepo;
import Repos.UserRepo;
import Services.RegistrationService;
import com.fasterxml.jackson.databind.JsonNode;
import models.BuukmiClient;
import models.BuukmiUser;
import models.Dtos.ClientProfileDto;
import models.Dtos.LoginDto;
import models.Dtos.LoginResponseDto;
import models.Dtos.RegisterDto;
import models.Exceptions.ResourceException;
import models.Responses.ApiResponseFailure;
import models.Responses.ApiResponseSuccess;
import models.Role;
import play.libs.Json;
import play.mvc.*;
import Security.*;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class HomeController extends Controller {
     @Inject RegistrationService registrationServiceImpl;
     @Inject PasswordService passwordService;
     @Inject JWTAuthService jwtAuthService;
     @Inject UserRepo userRepo;
     @Inject RoleRepo roleRepoImpl;

    /**
     * An action that renders an HTML page with a welcome message.
     * The configuration in the <code>routes</code> file means that
     * this method will be called when the application receives a
     * <code>GET</code> request with a path of <code>/</code>.
     */
    public Result index() {
        Logger logger = Logger.getLogger("HomeController");
        logger.warning("something");
        return ok(views.html.index.render());
    }
    public Result home(final Http.Request request) throws Exception{

        return ok();
    }
    @Security.GeneralAuthentication.Authenticated(JSONAuthenticator.class)
    public Result dashboard(final Http.Request request) {
        return ok("success");
    }
    public Result registerAsClient(final Http.Request request) {
        final JsonNode json = request.body().asJson();
        final RegisterDto registrationRequest = Json.fromJson(json, RegisterDto.class);
        final Role clientRole = roleRepoImpl.getRoles().get(0);
        final List<Role> listRole =  new ArrayList<Role>();
        listRole.add(clientRole);
        final Long userID = registrationServiceImpl.createNewUser(
                registrationRequest.phoneNr,
                registrationRequest.password,
                registrationRequest.email,
                listRole);
        try {
            final BuukmiClient clientProfile=  registrationServiceImpl.addClientProfile(
                    userID,
                    registrationRequest.firstName,
                    registrationRequest.lastName,
                    registrationRequest.username);
            return ok(new ApiResponseSuccess<>(new ClientProfileDto(clientProfile)).toJson());
        } catch (ResourceException e){
            return ok(new ApiResponseFailure("user does not exist","" ).toJson());
        }
    }

    public Result login(final Http.Request request){
        final JsonNode json = request.body().asJson();
        final LoginDto loginInfo = Json.fromJson(json, LoginDto.class);
        try {
            BuukmiUser buukmiUser = userRepo.getUserByNr(loginInfo.phoneNr);
            if(passwordService.isPwdValid(buukmiUser.getPassword(), loginInfo.password)){
                String refreshToken = jwtAuthService.getRefreshToken(buukmiUser);
                LoginResponseDto loginResponseDto = new LoginResponseDto();
                loginResponseDto.setProfile(new ClientProfileDto(buukmiUser.getClientProfile()));
                loginResponseDto.setRefreshToken(refreshToken);
                loginResponseDto.setToken(jwtAuthService.getNewSessionToken(buukmiUser, refreshToken));
                return ok(Json.toJson(loginResponseDto));
            };
            return ok(new ApiResponseFailure("invalid password","" ).toJson());
        }catch (ResourceException exception){
            return ok(new ApiResponseFailure("user does not exist","" ).toJson());
        }
    }
}
