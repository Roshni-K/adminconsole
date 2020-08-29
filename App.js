import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducer'
import loggerMiddleware from './logger'
import {
   Router,
   Route
} from "react-router-dom";
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
import LoginForm from './containers/loginform';
import NewsUpload from './containers/newsupload';
import NewsList from './containers/newslist';
import './App.css'

const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware)

const composedEnhancers = compose(
   middlewareEnhancer
)
const store = createStore(rootReducer, undefined, composedEnhancers)

const checkCookie = (name = 'unpaid-media') => {
   const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
   if (match) {
      return true;
   }
   return false;
};
class App extends Component {
   render() {
      return (
         <Provider store={store}>
            <Router history={history}>
               <Route path="/login" render={() => <LoginForm/>} />
               <Route path="/newsupload" render={() => {
                  if (!checkCookie()) { return <LoginForm /> }
                  return <NewsUpload />
               }} />
               <Route exact path="/" render={() => {
                  if (!checkCookie()) { return <LoginForm /> }
                  return <NewsList />
               }} />
            </Router>
         </Provider>
      );
   }
}
export default App;