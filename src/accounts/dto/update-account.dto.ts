export class UpdateAccountDto {
    accountNumber?: string;
    accountType?: 'Current' | 'Saving';
    status?: 'Active' | 'Inactive';
}  