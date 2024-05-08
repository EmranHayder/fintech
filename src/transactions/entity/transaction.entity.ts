export class Transaction {
    id: string;
    accountId: string;
    beneficiaryId: string;
    amount: number;
    description: string;
    datetime: Date;
    status: string; // Enum: 'Pending', 'Completed', 'Failed'
}  