export interface BankAccount {
    id: string;
    accountType: 'personal' | 'business';
    balance: number;
    currency: string;
}
