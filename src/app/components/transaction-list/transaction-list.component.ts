import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { TransactionService } from './../../services/transaction.service';
import { Transaction } from './../../models/transactions';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  displayedColumns = ['transactionId', 'transactionType', 
                      'customerId', 'date', 'amount', 'taxAmount', 'dueDate', 'amountPaid'];
  dataSource: MatTableDataSource<Transaction>;
  transactions: Transaction[] = [];

  constructor(
    private transactionService: TransactionService
    ) {
    this.dataSource = new MatTableDataSource(this.transactions);
  }

  ngOnInit() {
    this.transactionService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
      if (transactions) {
         this.dataSource = new MatTableDataSource(transactions);
         console.log(this.dataSource);
      }
     });
  }

  getTransactions(): void {
    this.transactionService.getTransactions()
        .subscribe(transactions => transactions = transactions);
  }

}
