import { Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { CustomerService } from './../../services/customer.service';
import { Customer } from './../../models/customer';
import { MatTableDataSource, MatTable, MatSort } from '@angular/material';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})


export class CustomerComponent implements OnInit, AfterViewInit {
  displayedColumns = ['id', 'lastName', 'phone', 'email', 'options'];
  dataSource = new MatTableDataSource<Customer>();
  customers: Customer[] = [];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private customerService: CustomerService,
    private changeDetectorRefs: ChangeDetectorRef
    ) {
    this.dataSource = new MatTableDataSource(this.customers);
  }

  ngOnInit() {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
      if (customers) {
         this.dataSource = new MatTableDataSource(customers);
         console.log(this.dataSource);
      }
     });
  }

  ngAfterViewInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers()
        .subscribe(customers => {
          customers = customers;
          this.dataSource.data = this.customers;
          this.dataSource.sort = this.sort;
         });
  }

  delete(customer: Customer): void {
    this.customers = this.customers.filter(h => h !== customer);
    this.customerService.deleteCustomer(customer).subscribe();
    this.getCustomers();
    // this.refresh();
   }

   refresh() {
    this.customerService.getCustomers().subscribe(customers => {
      this.dataSource.data = customers;
      this.dataSource.sort = this.sort;
    });
    this.changeDetectorRefs.detectChanges();
  }

}
