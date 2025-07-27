import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useTokenValidation } from 'src/hooks/use-token-validation';

export function PrivateRoute({ children }: { children: JSX.Element }) {
    const location = useLocation();
    const { hasValidToken, validateToken } = useTokenValidation();
    
    const isAuthenticated = hasValidToken();

    useEffect(() => {
        if (isAuthenticated) {
            validateToken(location.pathname);
        }
    }, [location.pathname, isAuthenticated, validateToken]);

    if (!isAuthenticated) {
        return <Navigate to="/sign-in" replace />;
    }

    return children;
}
