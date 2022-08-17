import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/index.scss';
import App from 'App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query'

import { applyMiddleware, createStore } from 'redux'; 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import rootReducer from 'modules/index';
import { composeWithDevTools } from 'redux-devtools-extension';

const queryClient = new QueryClient();



const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

ReactDOM.render(
  
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
