import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { sessionManager } from 'src/utils/session-manager';

import { useToast } from 'src/contexts/toast-context';

export const useSessionManager = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();

    useEffect(() => {
        sessionManager.setNavigationCallback((path: string) => {
            navigate(path, { replace: true });
        });

        sessionManager.setToastCallback((message: string, type: 'success' | 'warning' | 'danger', duration?: number) => {
            showToast(message, type, duration);
        });

        return () => {
            sessionManager.setNavigationCallback(() => {});
            sessionManager.setToastCallback(() => {});
        };
    }, [navigate, showToast]);
};
