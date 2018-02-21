import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

import Home from './Home.js';
import City from './City.js';




ReactDOM.render(
    <div>
        <header></header>
        <Router history={hashHistory}>
            <Route path="/" component={Home} />
            <Route path="/city/:id" component={City} />
            <Route path="*" component={() => <p>Page Not Found</p>} />
        </Router>
        <footer className="footer">

            <img src="images/figures/logo-grey.png"/>
            <small>COPYRIGHT ReactUS 2018</small>

        </footer>
    </div>
    ,
    document.getElementById('root')
);

if (module.hot)
    module.hot.accept();