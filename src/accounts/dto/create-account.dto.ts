export class CreateAccountDto {
    userId: string;
    accountNumber: string;
    accountType: 'Current' | 'Saving';
}  