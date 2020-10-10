package controllers;

import Repos.RoleRepo;
import Services.IRegistrationService;
import Services.RegistrationService;
import akka.stream.impl.fusing.Log;
import com.fasterxml.jackson.databind.JsonNode;
import io.ebeaninternal.server.type.ScalarTypeJsonMapPostgres;
import models.BuukmiClient;
import models.Dtos.LoginDto;
import models.Dtos.RegisterDto;
import models.Exceptions.ResourceException;
import models.Responses.ApiResponseFailure;
import models.Responses.ApiResponseSuccess;
import models.Role;
import models.User;
import play.libs.Json;
import play.mvc.*;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.*;
import java.util.logging.Logger;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class HomeController extends Controller {
    @Inject RegistrationService registrationService;
    @Inject RoleRepo roleRepo;
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

    public Result registerAsClient(final Http.Request request) {
        final JsonNode json = request.body().asJson();
        final RegisterDto registrationRequest = Json.fromJson(json, RegisterDto.class);
        final Role clientRole = roleRepo.getRoles().get(0);
        final List<Role> listRole =  new ArrayList<Role>();
        listRole.add(clientRole);
        final Long userID = registrationService.createNewUser(
                registrationRequest.phoneNr,
                registrationRequest.password,
                registrationRequest.email,
                listRole);
        try {
            final BuukmiClient clientProfile=  registrationService.addClientProfile(
                    userID,
                    registrationRequest.firstName,
                    registrationRequest.lastName,
                    registrationRequest.username);
            return ok(new ApiResponseSuccess<>(clientProfile).toJson());
        } catch (ResourceException e){
            return ok(new ApiResponseFailure("user does not exist","" ).toJson());
        }


    }
}
