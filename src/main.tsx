import ReactDOM from 'react-dom/client';
import { Suspense, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import { AuthProvider } from './context/auth-context';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <StrictMode>
        <HelmetProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Suspense>
                        <App />
                    </Suspense>
                </BrowserRouter>
            </AuthProvider>
        </HelmetProvider>
    </StrictMode>
);
