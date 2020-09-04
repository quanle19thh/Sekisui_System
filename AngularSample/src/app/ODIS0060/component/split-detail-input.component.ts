import { SplitOrderDetailShiwake, SplitOrderDetailSplit } from '../entities/odis0060.entity';
import { SplitOrderDetailService } from '../services/split-detail-input-service';
import { Component, OnInit, OnDestroy, Output, EventEmitter, ChangeDetectorRef, ElementRef, ɵɵresolveBody, ViewEncapsulation, Input, ViewChild, assertPlatform } from '@angular/core';
import { MatTable } from '@angular/material';
import { WkAllItemTypesService } from '../../wk-all-item-types.service';
import { WkAllItemType } from '../../WkAllItemType';
import { Location } from '@angular/common';
import { AppComponent } from '../../app.component'
import { Const } from '../../common/const'
import { CommonComponent } from 'app/common/common.component';
import { Router } from '@angular/router';

@Component({
  selector: 'order-detail-input',
  templateUrl: './split-detail-input.component.html',
  styleUrls: ['./split-detail-input.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SplitOrderDetailInputComponent implements OnInit {

  shiwakeColumns: string[] = [
    'journalCode',
    'accountCode',
    'journalName',
    'orderSupplierCode',
    'orderSupplierName',
    'orderPlanAmount',
  ];

  bunkatsuColumnsName: string[] = [
    'requestDate',
    'requester',
    'approvalDate_lv1',
    'approvalPerson_lv1',
    'approvalDate_lv2',
    'approvalPerson_lv2',
  ];



  headerColspan: string[] = [
    'no',
    'orderPlanAmount',
    'comment',
    'irai',
    'shounin_1',
    'shounin_2',
    'order',
    'recieved',
    'payment',
  ]


  rows: string[] = [
    'index',
    'orderPlanAmount1',
    'comment1',
    'requestDate',
    'requester',
    'approvalDate_lv1',
    'approvalPerson_lv1',
    'approvalDate_lv2',
    'approvalPerson_lv2',
    'orderDate',
    'orderAmount',
    'recievedDate',
    'recievedAmount',
    'paymentDate',
    'paymentAmount',
  ];

  dataSource: any;

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  sum: number = 93555;

  title = '発注明細入力＿分割明細入力';

  shiwakeData: SplitOrderDetailShiwake[];

  bunkatsuData: SplitOrderDetailSplit[];

  orderPlanAmount: string;
  comment: string;
  requestDate: string;
  requester: string;

  selected: boolean;

  index: number;


  constructor(
    private appComponent: AppComponent,
    private service: SplitOrderDetailService,
    private modalService: SplitOrderDetailService,
    private _location: Location,
    private commonComponent: CommonComponent,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getSplitOderDetailShiwake();
    this.getSplitOrderDetailSplit()
    this.appComponent.setHeader(Const.ScreenName.S0007, Const.LinKSetting.L0004); this.sum = this.bunkatsuData.map(data => Number(data.orderPlanAmount)).reduce((acc, value) => (acc + value));

  }

  getSplitOderDetailShiwake() {

    this.service.getSplitOderDetailShiwake()
      .subscribe(
        data => this.shiwakeData = data
      );
  }

  getSplitOrderDetailSplit() {
    this.service.getSplitOrderDetailSplit()
      .subscribe(
        data => this.bunkatsuData = data
      );
  }

  ngOnChanges() {
    this.sum = this.bunkatsuData.map(data => Number(data.orderPlanAmount)).reduce((acc, value) => (acc + value));
  }

  public onBackClick($event) {
    this._location.back();
  }

  public onSelectClick($event) {

    if (this.orderPlanAmount || this.comment || this.requestDate || this.requester) {
      var temp: SplitOrderDetailSplit = {
        orderPlanAmount: this.orderPlanAmount,
        comment: this.comment,
        requestDate: this.requestDate,
        requester: this.requester,
        approvalDate_lv1: "",
        approvalPerson_lv1: "",
        approvalDate_lv2: "",
        approvalPerson_lv2: "",
        orderDate: "",
        orderAmount: "",
        recievedDate: "",
        recievedAmount: "",
        paymentDate: "",
        paymentAmount: "",
      }

      this.bunkatsuData.push(temp);
      this.sum = this.bunkatsuData.map(data => Number(data.orderPlanAmount)).reduce((acc, value) => (acc + value));
      this.table.renderRows();
    }
  }

  public onSelHighLight($event, selectedItem) {
    this.selected = true
    this.commonComponent.CommonOnSelHight($event);
    this.orderPlanAmount = selectedItem.orderPlanAmount;
    this.comment = selectedItem.comment;
    this.requestDate = selectedItem.requestDate;
    this.requester = selectedItem.requester;
    this.index = this.bunkatsuData.indexOf(selectedItem);
  }

  onUpdateClick($event) {
    if (this.selected) {
      this.bunkatsuData[this.index].orderPlanAmount = this.orderPlanAmount
      this.bunkatsuData[this.index].comment = this.comment
      this.bunkatsuData[this.index].requestDate = this.requestDate
      this.bunkatsuData[this.index].requester = this.requester
      this.table.renderRows();
    } else {
      alert("行を選択してください。");
    }
  }
}