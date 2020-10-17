import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App.jsx';
import { Provider } from 'react-redux';
import { store } from './app/reducers/index';

import { BrowserRouter } from 'react-router-dom'

// load stylesheet
require("./default.scss");


ReactDOM.render(<Provider store={store}>
   
    <BrowserRouter>
        <App/>
    </BrowserRouter>

</Provider>, document.getElementById('app'));
