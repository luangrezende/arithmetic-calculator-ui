export const getSessionExpiredMessage = () => 
    'Your session has expired for security reasons. You will be redirected to login.';

export const getUnauthorizedMessage = () => 
    'Unauthorized access. Please check your credentials and try again.';

export const getConnectionErrorMessage = () => 
    'Connection error. Please check your internet connection and try again.';

export const getGenericErrorMessage = () => 
    'An unexpected error occurred. Please try again in a few moments.';

export const showSessionExpiredToast = (showToast: (message: string, type: 'success' | 'warning' | 'danger', duration?: number) => void) => {
    showToast(getSessionExpiredMessage(), 'warning', 5000);
};

export const showUnauthorizedToast = (showToast: (message: string, type: 'success' | 'warning' | 'danger', duration?: number) => void) => {
    showToast(getUnauthorizedMessage(), 'danger', 4000);
};

export const showConnectionErrorToast = (showToast: (message: string, type: 'success' | 'warning' | 'danger', duration?: number) => void) => {
    showToast(getConnectionErrorMessage(), 'warning', 4000);
};
