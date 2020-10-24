
import './common/header/Component.js';
import './common/footer/Component.js';

import './user/login/Page.js';
import './user/forgot-password/Page.js';

import './todo/form/Component.js';
import './todo/items/Component.js';
import './todo/Page.js';

import API from './utils/API.js';
import Router from './utils/Router.js';

API.baseUrl = 'http://localhost:8080';

Router.addRoute('', 'login-page');
Router.addRoute('forgot-password', 'forgot-password-page');
Router.addRoute('todos', 'todo-page');
