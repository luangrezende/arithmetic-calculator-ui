import ReactDOM from 'react-dom/client';
import { Suspense, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import { AuthProvider } from './context/auth-context';
import { ThemeProvider } from './context/theme-context';
import { BalanceProvider } from './context/balance-context';
import { ToastProvider } from './contexts/toast-context';
import { NotificationsProvider } from './context/notifications-context';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <StrictMode>
        <HelmetProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Suspense>
                        <ThemeProvider>
                            <ToastProvider>
                                <NotificationsProvider>
                                    <BalanceProvider>
                                        <App />
                                    </BalanceProvider>
                                </NotificationsProvider>
                            </ToastProvider>
                        </ThemeProvider>
                    </Suspense>
                </BrowserRouter>
            </AuthProvider>
        </HelmetProvider>
    </StrictMode>
);
