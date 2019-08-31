import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Customer } from './models/customer';
import { Transaction } from './models/transactions';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const customers = [
      { id: 288066, firstName: 'Paul', lastName: 'Dylan', phone: '(123) 456-7890', email: 'dylanp@agilitycis.com' },
      { id: 288065, firstName: 'David', lastName: 'Caird', phone: '(123) 456-7890', email: 'davidc@agilitycis.com' }
    ];

    const transactions = [
      {
        transactionId: 308211,
        transactionType: 'Receipt',
        customerId: 288066,
        date: '14/08/2019',
        amount: -29.14,
        taxAmount: 0,
        dueDate: '',
        amountPaid: ''
      },
      {
        transactionId: 323845,
        transactionType: 'Invoice',
        customerId: 288066,
        date: '12/08/2019',
        amount: 25.34,
        taxAmount: 3.8,
        dueDate: '14/08/2019',
        amountPaid: 29.14
      },
      {
        transactionId: 303900,
        transactionType: 'Receipt',
        customerId: 288065,
        date: '08/08/2019',
        amount: -42.54,
        taxAmount: 0,
        dueDate: '',
        amountPaid: ''
      },
      {
        transactionId: 318623,
        transactionType: 'Invoice',
        customerId: 288066,
        date: '06/08/2019',
        amount: 36.99,
        taxAmount: 5.55,
        dueDate: '08/08/2019',
        amountPaid: 42.54
      },
      {
        transactionId: 296672,
        transactionType: 'Receipt',
        customerId: 288065,
        date: '01/08/2019',
        amount: -42.45,
        taxAmount: 0,
        dueDate: '',
        amountPaid: ''
      },
      {
        transactionId: 311355,
        transactionType: 'Invoice',
        customerId: 288066,
        date: '30/07/2019',
        amount: 36.91,
        taxAmount: 5.54,
        dueDate: '01/08/2019',
        amountPaid: 42.45
      },
      {
        transactionId: 289546,
        transactionType: 'Receipt',
        customerId: 288065,
        date: '25/07/2019',
        amount: -41.3,
        taxAmount: 0,
        dueDate: '',
        amountPaid: ''
      },
      {
        transactionId: 304186,
        transactionType: 'Invoice',
        customerId: 288066,
        date: '23/07/2019',
        amount: 35.91,
        taxAmount: 5.39,
        dueDate: '25/07/2019',
        amountPaid: 41.3
      },
      {
        transactionId: 282348,
        transactionType: 'Receipt',
        customerId: 288065,
        date: '18/07/2019',
        amount: -35.9,
        taxAmount: 0,
        dueDate: '',
        amountPaid: ''
      },
      {
        transactionId: 297009,
        transactionType: 'Invoice',
        customerId: 288066,
        date: '16/07/2019',
        amount: 31.22,
        taxAmount: 4.68,
        dueDate: '18/07/2019',
        amountPaid: 35.9
      },
      {
        transactionId: 275342,
        transactionType: 'Receipt',
        customerId: 288065,
        date: '11/07/2019',
        amount: -38.9,
        taxAmount: 0,
        dueDate: '',
        amountPaid: ''
      },
      {
        transactionId: 289921,
        transactionType: 'Invoice',
        customerId: 288066,
        date: '09/07/2019',
        amount: 33.83,
        taxAmount: 5.07,
        dueDate: '11/07/2019',
        amountPaid: 38.9
      },
      {
        transactionId: 268322,
        transactionType: 'Receipt',
        customerId: 288066,
        date: '04/07/2019',
        amount: -41.04,
        taxAmount: 0,
        dueDate: '',
        amountPaid: ''
      },
      {
        transactionId: 282904,
        transactionType: 'Invoice',
        customerId: 288066,
        date: '02/07/2019',
        amount: 35.69,
        taxAmount: 5.35,
        dueDate: '04/07/2019',
        amountPaid: 41.04
      },
      {
        transactionId: 261402,
        transactionType: 'Receipt',
        customerId: 288066,
        date: '27/06/2019',
        amount: -40.41,
        taxAmount: 0,
        dueDate: '',
        amountPaid: ''
      },
      {
        transactionId: 275947,
        transactionType: 'Invoice',
        customerId: 288066,
        date: '25/06/2019',
        amount: 35.14,
        taxAmount: 5.27,
        dueDate: '27/06/2019',
        amountPaid: 40.41
      },
      {
        transactionId: 254554,
        transactionType: 'Receipt',
        customerId: 288066,
        date: '20/06/2019',
        amount: -42.12,
        taxAmount: 0,
        dueDate: '',
        amountPaid: ''
      },
      {
        transactionId: 269046,
        transactionType: 'Invoice',
        customerId: 288066,
        date: '18/06/2019',
        amount: 36.63,
        taxAmount: 5.49,
        dueDate: '20/06/2019',
        amountPaid: 42.12
      },
      {
        transactionId: 247711,
        transactionType: 'Receipt',
        customerId: 288066,
        date: '13/06/2019',
        amount: -43.83,
        taxAmount: 0,
        dueDate: '',
        amountPaid: ''
      },
      {
        transactionId: 262210,
        transactionType: 'Invoice',
        customerId: 288066,
        date: '11/06/2019',
        amount: 38.11,
        taxAmount: 5.72,
        dueDate: '13/06/2019',
        amountPaid: 43.83
      }
    ];
    return {customers, transactions};
  }

  // Overrides the genId method to ensure that a customer always has an id.
  // If the customers array is empty,
  // the method below returns the initial number (11).
  // if the customer array is not empty, the method below returns the highest
  // customer id + 1.
  genId(customers: Customer[]): number {
    return customers.length > 0 ? Math.max(...customers.map(customer => customer.id)) + 1 : 11;
  }

  // genId<T extends Customer | Transaction >(myTable: T[]): number {
  //   return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
  // }
}
