import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom';
import { ActionCableProvider } from 'react-actioncable-provider';

import registerServiceWorker from './registerServiceWorker';

//ADAPTERS
import { API_WS_ROOT } from './Adapters/AdapterConstants';

//REDUX
import store from './store';

//STYLING
import './index.css';
import 'semantic-ui/dist/semantic.min.css';

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
