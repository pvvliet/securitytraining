
class Component extends HTMLElement
{
    constructor()
    {
        super();

        window.appFooter = this;

        this.createView();
    }

    connectedCallback()
    {
        this.update();
    }

    update()
    {
        this.innerHTML = this.createView();
    }

    createView()
    {
        return `<footer>
                    <a href="http://localhost:8080/download?file=src/main/resources/private/help.pdf">Help</a>
                </footer>`;
    }
}

customElements.define('app-footer', Component);
