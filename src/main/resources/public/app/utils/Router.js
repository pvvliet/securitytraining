
export default class Router extends HTMLElement
{
    static routes = {};

    constructor()
    {
        super();

        this.updateHandler = () => this.update();
    }

    connectedCallback()
    {
        window.addEventListener('load', this.updateHandler);
        window.addEventListener('hashchange', this.updateHandler);
    }

    disconnectedCallback()
    {
        window.removeEventListener('load', this.updateHandler);
        window.removeEventListener('hashchange', this.updateHandler);
    }

    update()
    {
        let path = window.location.hash;

        if (path.startsWith('#'))
        {
            path = path.substring(1);
        }

        let component = Router.routes[path];

        if (!component)
        {
            component = Router.routes[''];
        }

        this.innerHTML = `<${component}></${component}>`;
    }

    static route(path)
    {
        if (path.includes('?'))
        {
            const end = path.indexOf('?');
            path = path.substring(0, end);
        }

        window.location.hash = path;
    }

    static addRoute(path, component)
    {
        Router.routes[path] = component;
    }
}

customElements.define('app-router', Router);
