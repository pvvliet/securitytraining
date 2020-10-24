
export default class HtmlUtils
{
    static htmlEscape(string)
    {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(string));
        return div.innerHTML;
    }
}
