import type { User } from "src/models/user";
import type { BankAccount } from "src/models/bank-account";

export const saveProfile = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('account', JSON.stringify(user.accounts?.[0] || null));
};

export const getProfile = (): User | null => {
    const bankAccountJson = localStorage.getItem("user");

    if (!bankAccountJson) {
        return null;
    }

    try {
        const bankAccount: User = JSON.parse(bankAccountJson);
        return bankAccount;
    } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        return null; 
    }
};

export const getProfileBankAccount = (): BankAccount | null => {
    const bankAccountJson = localStorage.getItem("account");

    if (!bankAccountJson) {
        return null;
    }

    try {
        const bankAccount: BankAccount = JSON.parse(bankAccountJson);
        return bankAccount;
    } catch (error) {
        console.error("Error parsing bank account from localStorage:", error);
        return null; 
    }
};
