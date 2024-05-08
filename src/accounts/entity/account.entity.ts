export class Account {
    id: string;
    userId: string;
    accountNumber: string;
    accountType: 'Current' | 'Saving';
    status: 'Active' | 'Inactive';
    balance: number;
}  