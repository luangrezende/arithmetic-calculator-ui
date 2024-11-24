import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }: { children: JSX.Element }) {
    const isAuthenticated = !!localStorage.getItem('token'); // Exemplo: verifica token no localStorage
    return isAuthenticated ? children : <Navigate to="/sign-in" replace />;
}
