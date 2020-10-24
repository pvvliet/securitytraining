package nl.uitdehoogte.security;

import org.springframework.security.crypto.password.PasswordEncoder;

public class PlainTextPasswordEncoder implements PasswordEncoder
{
    @Override
    public String encode(CharSequence charSequence)
    {
        return charSequence.toString();
    }

    @Override
    public boolean matches(CharSequence charSequence, String string)
    {
        return string.equals(charSequence.toString());
    }
}
