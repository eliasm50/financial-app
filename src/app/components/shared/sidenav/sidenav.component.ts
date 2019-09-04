import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent implements OnInit, OnDestroy {
  isExpanded = true;
    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
      this.isExpanded = true;
    }

    mobileQuery: MediaQueryList;

    fillerNav = [
      {name: 'Home', route: '', icon: 'home'},
      {name: 'Customers', route: 'customers', icon: 'perm_contact_calendar'},
      {name: 'Transactions', route: 'transactions', icon: 'account_balance'}
    ];

    // tslint:disable-next-line:variable-name
    private _mobileQueryListener: () => void;

    shouldRun = true; 

    ngOnDestroy(): void {
      this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    ngOnInit() {
    }

    logout() {
      alert('logged out!');
    }

}
