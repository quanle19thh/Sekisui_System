import { OrderDetailShiwakeTable } from './order-detail-input/table-shiwake/table-shiwake';
import { OrderDetailApprovalService } from './order-detail-approval/order-detail-service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SearchFrameComponent } from './search-frame/search-frame.component';
import { SearchFrameComponent2 } from './search-frame2/search-frame2.component';
import { RouteDetailComponent } from './route-detail/route-detail.component';
import { WkAllItemTypesService } from './wk-all-item-types.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderDetailApprovalComponent } from './order-detail-approval/order-detail-approval.component';

import { IndexComponent } from './index/index.component';
import { OrderJournalSelectComponent } from './order-journal-select/order-journal-select.component';
import { SupplierPatternComponent } from './supplier-pattern/supplier-pattern.component';
import { SplitDetailInputComponent } from './split-detail-input/split-detail-input.component';
import { OrderDetailInputComponent } from './order-detail-input/order-detail-input.component';
import { TestComponent } from './test/test.component';
import { OrderSupplierSelectComponent } from './order-supplier-select/order-supplier-select.component';
import { OrderDetailSelectComponent } from './order-detail-select/order-detail-select.component';
import { OrderDetailAddInputComponent } from './order-detail-add-input/order-detail-add-input.component';

// 発注明細入力＿承認処理テーブル
import { OrderDetailApprovalTable } from './order-detail-approval/oder-detail-approval-table';
import { MatTableModule, MatTabsModule, MatButtonModule, MatButtonToggleModule, MatIconModule } from '@angular/material';
import { MatPaginatorModule, MatPaginatorIntl} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { OrderDetailPaginator } from './order-detail-approval/order-detail-paginator';


const appRoute: Routes = [
  { path: '', component: IndexComponent },
  { path: '1', component: SearchFrameComponent },
  { path: '2', component: SearchFrameComponent2 },
  { path: '3', component: RouteDetailComponent },
  { path: 'OrderDetailApproval', component: OrderDetailApprovalComponent },
  { path: 'searchFrame', component: SearchFrameComponent },
  { path: 'OrderJournalSelect', component: OrderJournalSelectComponent },
  { path: 'SupplierPattern', component: SupplierPatternComponent},
  { path: '6', component: SplitDetailInputComponent},
  { path: 'OrderDetailInput', component: OrderDetailInputComponent},
  { path: 'test', component: TestComponent},
  { path: 'OrderSupplierSelect', component: OrderSupplierSelectComponent},
  { path: 'OrderDetailAddInput', component: OrderDetailAddInputComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    SearchFrameComponent,
    SearchFrameComponent2,
    RouteDetailComponent,
    OrderDetailApprovalComponent,
    IndexComponent,
    OrderJournalSelectComponent,
    SupplierPatternComponent,
    SplitDetailInputComponent,
    OrderDetailInputComponent,
    TestComponent,
    OrderSupplierSelectComponent,
    OrderDetailSelectComponent,
    OrderDetailAddInputComponent,

    // 発注明細入力＿承認処理テーブル
    OrderDetailApprovalTable,
    OrderDetailShiwakeTable,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot(appRoute),

    // 発注明細入力＿承認処理テーブル
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
  ],
  providers: [WkAllItemTypesService, 
              OrderDetailApprovalService,
              {provide: MatPaginatorIntl, useValue: OrderDetailPaginator()}
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
