export class Transaction {
    transactionId: number;
    transactionType: string;
    customerId: string;
    description: string;
    date: Date;
    amount: number;
    taxAmount: number;
    dueDate: Date;
    amountPaid: number;

    // get description(customerName): string {
    //    return this.transactionType + ' - ' + customerName + '(' + this.customerId + ')';
    // }

}
