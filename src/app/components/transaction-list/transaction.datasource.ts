import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Observable, BehaviorSubject, of} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';
import { Transaction } from 'src/app/models/transactions';
import { TransactionService } from 'src/app/services/transaction.service';



export class TransactionsDataSource implements DataSource<Transaction> {

    private transactionsSubject = new BehaviorSubject<Transaction[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private transactionService: TransactionService) {

    }

    loadTransactions() {

        this.loadingSubject.next(true);

        this.transactionService.getTransactions().pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(lessons => this.transactionsSubject.next(lessons));

    }

    connect(collectionViewer: CollectionViewer): Observable<Transaction[]> {
        console.log('Connecting data source');
        return this.transactionsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.transactionsSubject.complete();
        this.loadingSubject.complete();
    }

}
