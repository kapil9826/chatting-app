import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBooQDaQBIzHeP5JYrnf-G9MIiTyVIFchI",
  authDomain: "react-chat-app-d5087.firebaseapp.com",
  databaseURL: "https://react-chat-app-d5087-default-rtdb.firebaseio.com",
  projectId: "react-chat-app-d5087",
  storageBucket: "react-chat-app-d5087.appspot.com",
  messagingSenderId: "696485534880",
  appId: "1:696485534880:web:a09bdea8c0fe79426dfdc5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
