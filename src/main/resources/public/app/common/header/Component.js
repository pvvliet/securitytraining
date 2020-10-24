
import API from '../../utils/API.js';
import Router from '../../utils/Router.js';

class Component extends HTMLElement
{
    constructor()
    {
        super();

        window.appHeader = this;

        this.updateHandler = () => this.update();
    }

    connectedCallback()
    {
        window.addEventListener('userLoggedIn', this.updateHandler);
        window.addEventListener('userLoggedOut', this.updateHandler);

        this.update();
    }

    disconnectedCallback()
    {
        window.removeEventListener('userLoggedIn', this.updateHandler);
        window.removeEventListener('userLoggedOut', this.updateHandler);
    }

    update()
    {
        this.innerHTML = this.createView();
    }

    createView()
    {
        const userInformation = API.hasCredentials()
            ? this.createUserView()
            : '';

        return `<header>
                    <div class="container ${ API.hasCredentials() ? 'full' : 'small' }">
                        <div class="title">
                            Todo tracker
                            <span class="slogan">Always on time</span>
                        </div>
                        <div class="user-info">${ userInformation }</div>
                    </div>
                </header>`;
    }

    createUserView()
    {
        const username = window.authenticator.name;

        return `<div class="username">${ username }</div>
                <div class="link" onclick="appHeader.logout()">Logout</div>`;
    }

    logout()
    {
        API.deleteCredentials();

        window.dispatchEvent(new Event('userLoggedIn'));

        Router.route('');
    }
}

customElements.define('app-header', Component);
