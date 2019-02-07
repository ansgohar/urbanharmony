import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App.jsx';
import MoreNews from './app/components/moreNewsPage.jsx';
import HomePage from './app/components/home.jsx';
import DetailInternal from './app/components/internalDetails.jsx'
import ComplainsData from './app/components/complains/complainsData.jsx'
import { Provider } from 'react-redux';
import { store } from './app/reducers/index';

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

// load stylesheet
require("./default.scss");


ReactDOM.render(<Provider store={store}>
   
    <BrowserRouter>
        <App/>
    </BrowserRouter>

</Provider>, document.getElementById('app'));
