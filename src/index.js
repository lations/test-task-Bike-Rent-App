import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import App from './components/app';
import reducers from './reducers/MainReducer';

const localStorageMiddleware = ({getState}) => {
  return (next) => (action) => {
      const result = next(action);
      localStorage.setItem('bikeRentApplicationState', JSON.stringify(
          getState()
      ));
      return result;
  };
};

const reHydrateStore = () => { 
  if (localStorage.getItem('bikeRentApplicationState') !== null) {
      return JSON.parse(localStorage.getItem('bikeRentApplicationState')) 
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    reHydrateStore(),
    composeEnhancers(applyMiddleware(
      localStorageMiddleware,	thunk
    ))
)

store.subscribe(()=> console.log(store.getState()))

ReactDOM.render(
  <Provider store={store}>
		  <App />
	</Provider>
  , document.getElementById('root'));

