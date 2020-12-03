import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import './index.css';

import App from './App';
import Homepage from './Homepage/homepage';
import LoginPage from './Loginpage/loginpage';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>

    <CookiesProvider>

      <Route exact path="/" component={Homepage} />
      <Route exact path="/application" component={App} />
      <Route exact path="/loginPage" component={LoginPage} />

    </CookiesProvider>

  </BrowserRouter>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
