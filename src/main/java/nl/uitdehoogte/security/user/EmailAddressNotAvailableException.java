package nl.uitdehoogte.security.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(
    code = HttpStatus.CONFLICT,
    reason = "Not found"
)
public class EmailAddressNotAvailableException extends RuntimeException
{

}
