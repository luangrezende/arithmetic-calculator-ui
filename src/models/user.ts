import type { BankAccount } from './bank-account';

export interface User {
    id: number;
    username: string;
    name: string;
    status: 'active' | 'inactive';
    accounts: BankAccount[];
}
