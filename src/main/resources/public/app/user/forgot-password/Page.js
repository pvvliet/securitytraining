
import API from '../../utils/API.js';
import Router from '../../utils/Router.js';

class Page extends HTMLElement
{
    constructor()
    {
        super();

        window.forgotPasswordPage = this;
    }

    connectedCallback()
    {
        this.errorMessage = '';
        this.mailSent = false;

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

                        <h1>Forgot password</h1>

                        <div class="success-message ${ this.mailSent ? 'visible' : 'hidden' }">
                            Request sent! Check your email for your new password.<br /><br />
                            <a href="#">Back to login</a>
                        </div>

                        <div class="error-message ${ this.errorMessage === '' ? 'hidden' : 'visible' }">
                            ${ this.errorMessage }
                        </div>

                        <form onsubmit="return forgotPasswordPage.submit(this)" class="${ this.mailSent ? 'hidden' : 'visible' }">
                            <input type="text" name="email" placeholder="Email address" />
                            <input type="submit" value="Send" />
                            <a href="#" class="cancel">Cancel</a>
                        </form>
                        
                    </div>
                </main>`;
    }

    submit(form)
    {
        const email = form.email.value;
        
        if (email.trim() === '')
        {
            return false;
        }

        this.resetPassword(email);

        return false;
    }

    resetPassword(email)
    {
        API.put(`/users/resetpassword?email=${email}`)
            .then(() => { this.resetSuccess(); })
            .catch(error => { this.resetFailed(error); });
    }

    resetSuccess()
    {
        this.errorMessage = '';
        this.mailSent = true;

        this.update();
    }

    resetFailed(error)
    {
        console.log(error);

        switch (error.status)
        {
            case 404:
                this.errorMessage = 'Email address not found';
                break;

            default:
                this.errorMessage = 'Unknown error';
        }

        this.update();
    }
}

customElements.define('forgot-password-page', Page);
