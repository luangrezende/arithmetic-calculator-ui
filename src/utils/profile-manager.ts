import type { User } from "src/models/user";

export const saveProfile = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('account', JSON.stringify(user.accounts?.[0] || null));
};
