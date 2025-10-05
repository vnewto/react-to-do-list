import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserWrapper } from 'react-router';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserWrapper>
            <App />
        </BrowserWrapper>
    </StrictMode>
);
