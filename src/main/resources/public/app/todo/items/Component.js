
import API from '../../utils/API.js';

class Component extends HTMLElement
{
    constructor()
    {
        super();

        window.todoItemList = this;

        this.updateHandler = () => this.update();
    }

    connectedCallback()
    {
        window.addEventListener('todoItemAdded', this.updateHandler);

        this.update();
    }

    disconnectedCallback()
    {
        window.removeEventListener('todoItemAdded', this.updateHandler);
    }

    update()
    {
        API.get(`/todos?ownerId=${window.authenticator.id}`)
            .then(items => { this.itemsReceived(items); })
            .catch(this.itemsNotReceived);
    }

    itemsReceived(items)
    {
        this.innerHTML = this.createView(items);
    }

    itemsNotReceived(error)
    {
        console.log(error);
    }

    createView(items)
    {
        let itemViews = items.map(item => this.createItemView(item)).join('');

        if (itemViews === '')
        {
            itemViews = `<div class="no-items">Nothing to do! You can go for a holiday.</div>`;
        }

        return `<div class="box white-box">
                    <h1>Your items</h1>
                    <div class="todo-items">
                        ${ itemViews }
                    </div>
                </div>`;
    }

    createItemView(item)
    {
        return `<div class="todo-item">
                    <input type="checkbox" onchange="todoItemList.toggleItem(${ item.id })" ${ item.done ? 'checked' : '' } />
                    <span class="description">${ item.description }</span>
                </div>`;
    }

    toggleItem(itemId)
    {
        API.put(`/todos/${ itemId }/done`, {})
            .catch(this.itemNotToggled);
    }

    itemNotToggled(error)
    {
        console.log(error);
    }
}

customElements.define('todo-item-list', Component);
