import { SplitOrderDetailShiwake, SplitOrderDetailSplit } from '../entities/odis0060.entity';
import { ODIS0020OrderDetailList } from '../../ODIS0020/entities/odis0020-OrderDetailList.entity';
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
import { DatePipe } from '@angular/common';

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
    'orderSuplierCode',
    'orderSuplierName',
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

  //合計金額
  sum: number = 0;

  title = '発注明細入力＿分割明細入力';

  shiwakeData: SplitOrderDetailShiwake[];

  bunkatsuData: SplitOrderDetailSplit[];

  orderPlanAmount: string;
  comment: string;
  requestDate: string;
  requester: string;

  //テーブルの行が選択されているかどうか
  selected: boolean;

  //行のインデックス
  index: number;

  //現在の日付
  currentDate = Date.now();

  test:string;


  constructor(
    private appComponent: AppComponent,
    private service: SplitOrderDetailService,
    private modalService: SplitOrderDetailService,
    private _location: Location,
    private commonComponent: CommonComponent,
    private router: Router,
    public datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.getSplitOderDetailShiwake();
    this.getSplitOrderDetailSplit();
    this.appComponent.setHeader(Const.ScreenName.S0006, Const.LinKSetting.L0006);
  }

  getSplitOderDetailShiwake() {
    this.shiwakeData = this.service.getSplitTable();
  }

  getSplitOrderDetailSplit() {
    this.bunkatsuData = this.service.getDetailTable();
  }

  sumxx(){
    return this.bunkatsuData.map(data => Number(data.orderPlanAmount)).reduce((acc, value) => (acc + value));
  }

  //「戻る」ボタンの押下
  public onBackClick($event) {
    this._location.back();
  }

  //「行の選択」
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
    } else {
      alert("明細情報を入力して下さい。");
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

  //「明細更新」ボタンの押下
  onUpdateClick($event) {
    if (this.selected) {
      this.bunkatsuData[this.index].orderPlanAmount = this.orderPlanAmount
      this.bunkatsuData[this.index].comment = this.comment
      this.bunkatsuData[this.index].requestDate = this.requestDate
      this.bunkatsuData[this.index].requester = this.requester
      this.table.renderRows();
    } else {
      alert("行を選択して下さい。");
    }
  }
  //「削除」ボタンの押下
  onDeleteClick($event) {
    if (this.selected) {
      if (this.index > -1) {
        this.bunkatsuData.splice(this.index, 1);
      }
      this.selected = false;
      this.table.renderRows();
    } else {
      alert("行を選択して下さい。");
    }
  }
  //「中止」ボタンの押下
  onClearClick($event) {
    this.selected = false;
    this.orderPlanAmount = "";
    this.comment = "";
    this.requestDate = "";
    this.requester = "";
  }

  //「依頼」ボタンの押下
  onAddOrderClick($event) {
    this.requester = "test";
    this.requestDate = this.datePipe.transform(this.currentDate, "yyyy/MM/dd").toString();
  }
}