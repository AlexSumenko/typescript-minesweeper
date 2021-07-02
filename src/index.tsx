// There are three levels for this game-

// Beginner – 9 * 9 Board and 10 Mines
// Intermediate – 16 * 16 Board and 40 Mines
// Advanced – 24 * 24 Board and 99 Mines

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { compose, createStore } from 'redux';
import rootReducer from './store/reducers';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss';

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
