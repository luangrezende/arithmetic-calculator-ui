import { useLocation } from 'react-router-dom';

export function useAuthRoute() {
    const location = useLocation();
    
    const authRoutes = ['/sign-in', '/sign-up', '/forgot-password'];
    
    return authRoutes.some(route => location.pathname.includes(route));
}
