package nl.uitdehoogte.security.user;

import nl.uitdehoogte.security.BaseRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UserRepository extends BaseRepository<User>
{
    public UserRepository()
    {
        add(new User("Donald Duck", "donald@duck.nl", "Donald!", new String[] { "USER" }));
        add(new User("Dagobert Duck", "dagobert@duck.nl", "Dagobert!", new String[] { "USER", "ADMIN" }));
    }

    public Optional<User> findByEmail(final String email)
    {
        return findFirst(user -> user.getEmail().equals(email));
    }
}
