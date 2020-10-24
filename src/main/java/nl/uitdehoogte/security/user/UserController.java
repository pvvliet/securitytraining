package nl.uitdehoogte.security.user;

import nl.uitdehoogte.security.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.Optional;

@RestController
@CrossOrigin
public class UserController extends BaseController
{
    @Autowired
    private UserService userService;

    @PostMapping(
        value = "/users",
        consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public void create(
        @RequestBody @Valid final User user)
    {
        userService.add(user);
    }

    @GetMapping(
        value = "/users",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    @Secured({"ROLE_ADMIN"})
    public Collection<User> retrieveAll(
        @PathVariable("id") final String id)
    {
        return userService.getAll();
    }

    @GetMapping(
        value = "/users/{id}",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    @Secured({"ROLE_USER", "ROLE_ADMIN"})
    public User retrieve(
        @PathVariable("id") final String id)
    {
        final Optional<User> user = userService.get(id);

        requireResult(user);

        return user.get();
    }

    @GetMapping(
        value = "/users/me",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    @Secured({"ROLE_USER", "ROLE_ADMIN"})
    public User retrieveAuthenticator(
        @AuthenticationPrincipal final AuthenticatorDetails authenticatorDetails)
    {
        return authenticatorDetails.getUser();
    }

    @PutMapping(
        value = "/users/{id}",
        consumes = MediaType.APPLICATION_JSON_VALUE
    )
    @Secured({"ROLE_USER", "ROLE_ADMIN"})
    public void update(
        @PathVariable("id") final String id,
        @RequestBody @Valid final User updatedUser)
    {
        Optional<User> actualUser = userService.get(id);

        requireResult(actualUser);

        userService.update(actualUser.get(), updatedUser);
    }

    @PutMapping(
        value = "/users/resetpassword"
    )
    public void resetPassword(
        @RequestParam("email") final String email
    )
    {
        Optional<User> user = userService.getByEmail(email);

        requireResult(user);

        userService.resetPassword(user.get());
    }

    @PutMapping(
        value = "/users/me/password",
        consumes = MediaType.APPLICATION_JSON_VALUE
    )
    @Secured({"ROLE_USER", "ROLE_ADMIN"})
    public void updatePassword(
        @RequestBody @Valid final UserPasswordDTO userPassword,
        @AuthenticationPrincipal final AuthenticatorDetails authenticatorDetails
    )
    {
        userService.updatePassword(authenticatorDetails.getUser(), userPassword.getPassword());
    }
}
