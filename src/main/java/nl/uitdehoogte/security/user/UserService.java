package nl.uitdehoogte.security.user;

import nl.uitdehoogte.security.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService
{
    @Autowired
    private UserRepository userRepository;

    public void add(final User user)
    {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent())
        {
            throw new EmailAddressNotAvailableException();
        }

        userRepository.add(user);
    }

    public Collection<User> getAll()
    {
        return userRepository.getAll();
    }

    public Optional<User> get(final String id)
    {
        return userRepository.get(id);
    }

    public Optional<User> getByEmail(final String email)
    {
        return userRepository.findByEmail(email);
    }

    public void update(final User actualUser, final User updatedUser)
    {
        userRepository.update(actualUser, updatedUser);
    }

    public void resetPassword(User user)
    {
        // TODO: implement me
    }

    public void updatePassword(final User user, final String password)
    {
        user.setPassword(password);
    }

    @Override
    public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException
    {
        final Optional<User> user = userRepository.findByEmail(username);

        if (!user.isPresent())
        {
            throw new UsernameNotFoundException(username);
        }

        return new AuthenticatorDetails(user.get());
    }
}
