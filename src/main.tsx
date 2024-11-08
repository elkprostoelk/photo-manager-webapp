import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {ToastProvider} from "./utils/contexts/ToastContext.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <ToastProvider>
            <App />
        </ToastProvider>
    </BrowserRouter>,
)
