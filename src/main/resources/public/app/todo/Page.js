
import Router from '../utils/Router.js';

class Page extends HTMLElement
{
    constructor()
    {
        super();

        window.todoPage = this;
    }

    connectedCallback()
    {
        if (!window.authenticator)
        {
            Router.route('');
            return;
        }

        this.update();
    }

    update()
    {
        this.innerHTML = this.createView();
    }

    createView()
    {
        return `<main id="todo-page" class="page">
                    <div class="container">
                        <div class="grid">
                            <todo-item-form></todo-item-form>
                            <todo-item-list></todo-item-list>
                        </div>
                    </div>
                </main>`;
    }
}

customElements.define('todo-page', Page);
