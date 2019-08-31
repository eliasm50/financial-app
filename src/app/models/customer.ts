export class Customer {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;

    get fullName(): string {
        return this.firstName + ' ' + this.lastName;
    }
}
