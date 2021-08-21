import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import AuthProvider from './contexts/AuthContext'
import MonitorProvider from './contexts/MonitorContext'
import NotificationProvider from './contexts/NotificationContext'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <MonitorProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </MonitorProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
