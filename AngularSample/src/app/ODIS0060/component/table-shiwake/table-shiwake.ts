import { SplitOrderDetailShiwake } from '../../entities/odis0060.entity';
import { ODIS0020OrderDetailList } from '../../../ODIS0020/entities/odis0020-OrderDetailList.entity';
import { Component, Input } from '@angular/core';
import { SplitOrderDetailService } from '../../services/split-detail-input-service';

@Component({
  selector: 'split-shiwake-table',
  styleUrls: ['table-shiwake.css'],
  templateUrl: './table-shiwake.html',
})

export class SplitOrderDetailShiwakeTable {

  @Input() shiwakeData: SplitOrderDetailShiwake[];

  shiwakeColumns: string[] = [
    'journalCode',
    'accountCode',
    'journalName',
    'orderSupplierCode',
    'orderSupplierName',
    'orderPlanAmount',
  ];

  dataSource: any;
}
