import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Customer } from './../models/customer';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customersUrl = 'api/customers';  // URL to web api

  constructor(
    private http: HttpClient,
    ) { }

    /** GET customers from the server */
  getCustomers(): Observable<Customer[]> {
       return this.http.get<Customer[]>(this.customersUrl)
       .pipe(
         tap(_ => this.log('fetched customers')),
         catchError(this.handleError<Customer[]>('getCustomers', []))
       );
  }

  /** GET hero by id. Will 404 if id not found */
  getCustomer(customerId: number): Observable<Customer> {
    const url = `${this.customersUrl}/${customerId}`;
    return this.http.get<Customer>(url).pipe(
      tap(_ => this.log(`fetched customer id=${customerId}`)),
      catchError(this.handleError<Customer>(`getCustomer id=${customerId}`))
    );
  }

   deleteCustomer(customer: Customer | number): Observable<Customer> {
    const id = typeof customer === 'number' ? customer : customer.id;
    const url = `${this.customersUrl}/${id}`;

    return this.http.delete<Customer>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted customer id=${id}`)),
      catchError(this.handleError<Customer>('deleteCustomer'))
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
