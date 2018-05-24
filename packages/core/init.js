//require('whatwg-fetch');
//require('babel-polyfill');

import {createElement} from 'react';
import {render} from 'react-dom';
import Main from 'main/main.jsx';


render(createElement(Main), document.getElementById('root'));
//module.hot.accept();
