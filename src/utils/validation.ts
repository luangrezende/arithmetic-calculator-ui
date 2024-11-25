export const validateField = (value: string): boolean => !value.trim();

export const validateFieldsSignup = (fields: { name: string; email: string; password: string, confirmPassword: string }) => ({
    name: !fields.name.trim(),
    email: !fields.email.trim(),
    password: !fields.password.trim(),
    confirmPassword: fields.password !== fields.confirmPassword,
});

export const validateFieldsSignin = (fields: { email: string; password: string }) => ({
    email: !fields.email.trim(),
    password: !fields.password.trim(),
});
    
export const validatePasswordStrength = (password: string) => {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    const isLongEnough = password.length >= 8;

    let score = 0;

    if (hasLowercase) score += 1;
    if (hasUppercase) score += 1;
    if (hasNumber) score += 1;
    if (hasSpecialChar) score += 1;
    if (isLongEnough) score += 1;

    const labels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const label = labels[score - 1] || 'Weak';

    return { score, label };
};




