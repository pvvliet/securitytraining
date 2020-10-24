package nl.uitdehoogte.security.todo;

import nl.uitdehoogte.security.BaseModel;
import nl.uitdehoogte.security.user.User;

import javax.validation.constraints.NotBlank;

public class Todo extends BaseModel
{
    private User owner;

    @NotBlank(message = "Description is mandatory")
    private String description;

    private boolean done;

    public Todo()
    {

    }

    public Todo(final User owner, final String description, final boolean done)
    {
        this.owner = owner;
        this.description = description;
        this.done = done;
    }

    public User getOwner()
    {
        return owner;
    }

    public void setOwner(User owner)
    {
        this.owner = owner;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public boolean isDone()
    {
        return done;
    }

    public void setDone(boolean done)
    {
        this.done = done;
    }
}
