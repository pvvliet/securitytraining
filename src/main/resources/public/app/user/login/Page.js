
import API from '../../utils/API.js';
import Router from '../../utils/Router.js';

class Page extends HTMLElement
{
    constructor()
    {
        super();

        window.loginPage = this;

        API.loadCredentials();
    }

    connectedCallback()
    {
        if (API.hasCredentials())
        {
            this.login();
            return;
        }

        this.errorMessage = '';

        this.update();
    }

    update()
    {
        this.innerHTML = this.createView();
    }

    createView()
    {
        return `<main class="page">
                    <div class="container box blue-box">

                        <h1>Login</h1>

                        <div class="error-message ${ this.errorMessage === '' ? 'hidden' : 'visible' }">
                            ${ this.errorMessage }
                        </div>

                        <form onsubmit="return loginPage.submit(this)">
                            <input type="text" name="email" placeholder="Email address" />
                            <input type="password" name="password" placeholder="Password" />
                            <div class="link" onclick="loginPage.forgotPassword()">Forgot password</div>
                            <input type="submit" value="Login" />
                        </form>
                        
                    </div>
                </main>`;
    }

    submit(form)
    {
        const email = form.email.value;
        const password = form.password.value;

        if (email.trim() === '' || password.trim() === '')
        {
            return false;
        }

        API.storeCredentials(form.email.value, form.password.value);

        this.login();

        return false;
    }

    login()
    {
        API.get('/users/me')
            .then(authenticator => { this.loginSuccess(authenticator); })
            .catch(error => { this.loginFailed(error); });
    }

    loginSuccess(authenticator)
    {
        window.authenticator = authenticator;

        window.dispatchEvent(new Event('userLoggedIn'));
        
        Router.route('todos');
    }

    loginFailed(error)
    {
        API.deleteCredentials();
        
        console.log(error);

        switch (error.status)
        {
            case 401:
                this.errorMessage = 'Invalid credentials';
                break;

            default:
                this.errorMessage = 'Unknown error';
        }

        this.update();
    }

    forgotPassword()
    {
        Router.route('forgot-password');
    }
}

customElements.define('login-page', Page);
