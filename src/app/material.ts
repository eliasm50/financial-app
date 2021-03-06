import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatGridListModule,
    MatSortModule, MatPaginatorModule, MatFormFieldModule, MatFormFieldControl, MatInputModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material';


@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatMenuModule,
        MatSidenavModule, MatIconModule, MatListModule, MatTableModule,
        MatGridListModule, MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule],
    exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatMenuModule,
        MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatGridListModule,
        MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule]
})

export class MaterialModule { }
