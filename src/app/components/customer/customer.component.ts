import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CustomerService } from './../../services/customer.service';
import { Customer } from './../../models/customer';
import { MatTableDataSource, MatTable } from '@angular/material';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})


export class CustomerComponent implements OnInit {
  displayedColumns = ['customerId', 'fullName', 'phone', 'email', 'options'];
  dataSource: MatTableDataSource<Customer>;
  customers: Customer[] = [];


  constructor(
    private customerService: CustomerService,
    private changeDetectorRefs: ChangeDetectorRef
    ) {
    this.dataSource = new MatTableDataSource(this.customers);
  }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers().subscribe(customers => {
      customers = customers;
      if (customers) {
         this.dataSource = new MatTableDataSource(customers);
         console.log(this.dataSource);
      }
     });
  }

  delete(customer: Customer): void {
    this.customers = this.customers.filter(h => h !== customer);
    this.customerService.deleteCustomer(customer).subscribe();
    this.refresh();
   }

   refresh() {
    this.customerService.getCustomers().subscribe(customers => {
      this.dataSource.data = customers;
    });
    this.changeDetectorRefs.detectChanges();
  }

}
