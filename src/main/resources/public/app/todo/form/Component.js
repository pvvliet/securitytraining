
import API from '../../utils/API.js';

class Component extends HTMLElement
{
    constructor()
    {
        super();

        window.todoItemForm = this;
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
        return `<div class="box blue-box">
                    <h1>Add item</h1>
                    <form onsubmit="return todoItemForm.submit(this)">
                        <textarea name="description" placeholder="What needs to be done?"></textarea>
                        <input type="submit" value="Add" />
                    </form>
                </div>`;
    }

    submit(form)
    {
        const value = form.description.value;

        if (value.trim() === '')
        {
            return false;
        }

        this.addItem(value);

        form.description.value = '';
        
        return false;
    }

    addItem(description)
    {
        API.post('/todos', { description: description, done: false })
            .then(this.itemAdded)
            .catch(this.itemNotAdded);
    }

    itemAdded()
    {
        window.dispatchEvent(new Event('todoItemAdded'));
    }

    itemNotAdded(error)
    {
        console.log(error);
    }
}

customElements.define('todo-item-form', Component);
