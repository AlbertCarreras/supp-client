import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

//REDUX
import store from './store';

//STYLING
import './index.css';

//COMPONENTS
import App from './App';


ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>, 
    document.getElementById('root')
);

registerServiceWorker();
