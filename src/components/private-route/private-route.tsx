import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }: { children: JSX.Element }) {
    const isAuthenticated = !!localStorage.getItem('token');

    return isAuthenticated ? children : <Navigate to="/sign-in" replace />;
}
