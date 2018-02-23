import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

import Home from './Home.js';
import City from './City.js';
import Activ from './Activ.js';
import ErrorPage from './ErrorPage.js';


ReactDOM.render(
    <div>
        <Router history={hashHistory}>
            <Route path="/" component={Home} />
            <Route path="/city/:id" component={City} />
            <Route path="/activity/:id" component={Activ} />
            <Route path="*" component={() => <ErrorPage/>} />
        </Router>
    </div>
    ,
    document.getElementById('root')
);

if (module.hot)
    module.hot.accept();