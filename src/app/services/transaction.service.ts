import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Transaction } from './../models/transactions';
import { CustomerService } from './customer.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactionsUrl = 'api/transactions';  // URL to web api

  constructor(
    private http: HttpClient,
    private customerService: CustomerService
    ) { }

    /** GET transactions from the server */
    /* DESIGN NOTE: this method presents some unnecesary inneficiency
     *  that is not present in a real scenario where the composed field description
     * comes calculated from the backend.
     * This is just for completing the excercise.
     * */
  getTransactions(): Observable<Transaction[]> {
       return this.http.get<Transaction[]>(this.transactionsUrl)
       .pipe(
        map(result => {
          result.forEach(item => {
            this.customerService.getCustomer(parseInt(item.customerId, 10))
            .subscribe(c => item.description = `${item.transactionType} - ${c.firstName} ${c.lastName} (${item.customerId})`);
          });
          return result;
        }),
         tap(_ => this.log('fetched transactions')),
         catchError(this.handleError<Transaction[]>('getTransactions', []))
       );
  }

  deleteTransaction(transaction: Transaction | number): Observable<Transaction> {
    const id = typeof transaction === 'number' ? transaction : transaction.transactionId;
    const url = `${this.transactionsUrl}/${id}`;

    return this.http.delete<Transaction>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted transaction id=${id}`)),
      catchError(this.handleError<Transaction>('deleteTransaction'))
    );
  }


  /*** Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // Let the app keep running by returning an empty result.
    return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService(TODO) */
  private log(message: string) {
    console.log(message);
  }
}

