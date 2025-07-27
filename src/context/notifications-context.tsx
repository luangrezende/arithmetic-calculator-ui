import { useMemo, useState, useContext, useCallback, createContext, type ReactNode } from 'react';

export interface OperationNotification {
    id: string;
    type: 'operation';
    operation: string;
    amount: number;
    isUnRead: boolean;
    createdAt: Date;
}

interface NotificationsContextProps {
    notifications: OperationNotification[];
    addOperationNotification: (operation: string, amount: number) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    clearNotifications: () => void;
}

const NotificationsContext = createContext<NotificationsContextProps | undefined>(undefined);

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<OperationNotification[]>(() => {
        const saved = localStorage.getItem('operation-notifications');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                const savedNotifications = parsed.map((notif: any) => ({
                    ...notif,
                    createdAt: new Date(notif.createdAt),
                    isUnRead: Boolean(notif.isUnRead)
                }));
                return savedNotifications.slice(0, 4);
            } catch (error) {
                console.error('Error parsing saved notifications:', error);
                return [];
            }
        }
        return [];
    });

    const saveToLocalStorage = useCallback((notifs: OperationNotification[]) => {
        localStorage.setItem('operation-notifications', JSON.stringify(notifs));
    }, []);

    const addOperationNotification = useCallback((operation: string, amount: number) => {
        const newNotification: OperationNotification = {
            id: Date.now().toString(),
            type: 'operation',
            operation,
            amount,
            isUnRead: true,
            createdAt: new Date(),
        };

        setNotifications(prev => {
            const updated = [newNotification, ...prev];
            const limited = updated.slice(0, 4);
            saveToLocalStorage(limited);
            return limited;
        });
    }, [saveToLocalStorage]);

    const markAsRead = useCallback((id: string) => {
        setNotifications(prev => {
            const updated = prev.map(notif => 
                notif.id === id ? { ...notif, isUnRead: false } : notif
            );
            saveToLocalStorage(updated);
            return updated;
        });
    }, [saveToLocalStorage]);

    const markAllAsRead = useCallback(() => {
        setNotifications(prev => {
            const updated = prev.map(notif => ({ ...notif, isUnRead: false }));
            saveToLocalStorage(updated);
            return updated;
        });
    }, [saveToLocalStorage]);

    const clearNotifications = useCallback(() => {
        setNotifications([]);
        localStorage.removeItem('operation-notifications');
    }, []);

    const value = useMemo(() => ({
        notifications,
        addOperationNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
    }), [notifications, addOperationNotification, markAsRead, markAllAsRead, clearNotifications]);

    return (
        <NotificationsContext.Provider value={value}>
            {children}
        </NotificationsContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationsContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationsProvider');
    }
    return context;
};
