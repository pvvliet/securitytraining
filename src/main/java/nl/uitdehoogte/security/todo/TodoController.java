package nl.uitdehoogte.security.todo;

import nl.uitdehoogte.security.BaseController;
import nl.uitdehoogte.security.user.AuthenticatorDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.Optional;

@RestController
@CrossOrigin
public class TodoController extends BaseController
{
    @Autowired
    private TodoService todoService;

    @PostMapping(
        value = "/todos",
        consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public void create(
        @RequestBody @Valid final Todo todo,
        @AuthenticationPrincipal final AuthenticatorDetails authenticatorDetails)
    {
        todoService.add(authenticatorDetails.getUser(), todo);
    }

    @GetMapping(
        value = "/todos",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Collection<Todo> retrieveByOwner(
        @RequestParam(name = "ownerId") final String ownerId)
    {
        return todoService.getByOwner(ownerId);
    }

    @PutMapping(
        value = "/todos/{id}/done"
    )
    public void toggleDone(
        @PathVariable("id") final String id
    )
    {
        Optional<Todo> todo = todoService.get(id);

        requireResult(todo);

        todoService.toggleDone(todo.get());
    }
}
