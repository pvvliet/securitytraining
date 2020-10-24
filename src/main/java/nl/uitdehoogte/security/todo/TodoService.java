package nl.uitdehoogte.security.todo;

import nl.uitdehoogte.security.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class TodoService
{
    @Autowired
    private TodoRepository todoRepository;

    public void add(final User owner, final Todo todo)
    {
        todo.setOwner(owner);

        todoRepository.add(todo);
    }

    public Optional<Todo> get(String id)
    {
        return todoRepository.get(id);
    }

    public Collection<Todo> getByOwner(final String ownerId)
    {
        return todoRepository.findAll(todo -> todo.getOwner().getId().equals(ownerId));
    }

    public void toggleDone(Todo todo)
    {
        todo.setDone(!todo.isDone());
    }
}
