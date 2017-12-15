
// =================== SETUP =================== //

// React
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
// REACT-ROUTER
import {BrowserRouter} from 'react-router-dom';
// REDUX
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducers/reducer';
// APP 
import App from './App';
// CSS
import './index.css';


// ================= RENDER APP ================ //

const store = createStore(reducer);

const app = (
    <Provider store={store}> 
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

