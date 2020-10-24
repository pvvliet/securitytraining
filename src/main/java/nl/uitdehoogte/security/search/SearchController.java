package nl.uitdehoogte.security.search;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SearchController
{
    @GetMapping(
        value = "/search",
        produces = MediaType.TEXT_HTML_VALUE
    )
    public String search(
        @RequestParam(name = "q", required = false, defaultValue = "") String query)
    {
        final String content = !query.isEmpty()
                ? "<div class='result'><span class='result-title'>No results for: </span><span class='result-query'>" + query + "</span></div>"
                : "";

        return   "<!DOCTYPE html><html>"
                + "<head><title>Power Search</title></head>"
                + "<body style='text-align: center; font-family: sans-serif;'>"
                    + "<header style='font-size: 30px;'>Power search</header><br>"
                    + "<form action='/search?'>"
                        + "<input type='text' name='q' placeholder='Enter query to search...' style='width: 300px; height: 20px;' /> "
                        + "<input type='submit' value='Search!' style='padding: 3px; 10px;' />"
                    + "</form><br>"
                    + content
                + "</body></html>";
    }
}
