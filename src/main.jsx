import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/styles/Password.css';
import './assets/styles/FloatingLetters.css';
import './assets/styles/Header.css';
import './assets/styles/Home.css';
import './assets/styles/About.css';
import './assets/styles/Cases.css';
import './assets/styles/Objects.css';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
