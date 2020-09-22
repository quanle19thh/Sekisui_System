import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component'
import { Const } from '../../common/const'
import { CommonComponent } from 'app/common/common.component';
import { OrderSplitApprovalMasterTable } from '../entities/odis0070.entity';
import { OrderSplitApprovalMasterService } from '../services/order-split-approval-master-service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CommonService } from '../../common/common.service';
import { ODIS0070Form } from '../entities/odis0070-Form.entity';

@Component({
  selector: 'app-order-split-approval-master',
  templateUrl: './order-split-approval-master.component.html',
  styleUrls: ['./order-split-approval-master.component.css']
})
export class OrderSplitApprovalMasterComponent implements OnInit {

  //編集テーブルの値
  personalID: string = "";
  employeeCode: string = "";
  employeeName: string = "";
  approval1: string = "";
  approval2: string = "";
  deleteFlag: string = "";

  //行が選択されているかどうか
  selected: boolean;
  
  //選択された行のインデックス
  index: number;

  
  // パラメータ
  param = new ODIS0070Form();

  //発注分割承認者マスタのインターフェース
  orderApprovalData: OrderSplitApprovalMasterTable[];

  //発注分割承認者マスタテーブルのカラム
  orderApprovalColumns: string[] = [
    'personalID',
    'employeeCode',
    'employeeName',
    'approval1',
    'approval2',
    'deleteFlag'
  ];

  dataSource: any;

  /**
   * コンストラクタ
   *
   * @param {service} service
   * @memberof OrderSplitApprovalMasterService
   */
  constructor(
    private appComponent: AppComponent,
    private commonComponent: CommonComponent,
    private _location: Location,
    private service: OrderSplitApprovalMasterService,
    private router: Router,
    private CommonService: CommonService,  
  ) { }

  /**
   * ページがロードする時、テーブルデータを取得する
   */
  ngOnInit() {
    this.appComponent.setHeader(Const.ScreenName.S0007, Const.LinKSetting.L0007);
    this.getOrderSplitApproval();
  }

  /**
   * テーブルデータの取得
   *
   * @param $event イベント
   */
  getOrderSplitApproval() {

        // 発注明細入力_承認処理取得
        this.CommonService.getSearchRequest(Const.UrlLinkName.S0007_Init,this.param)
        .then(
          (response) => {
            this.orderApprovalData = response;
          }
        );

    // this.service.getOrderSplitApproval()
    //   .subscribe(
    //     data => this.orderApprovalData = data
    //   );
  }

  /**
   * 「戻る」ボタンの押下
   *
   * @param $event イベント
   */
  public onBackClick($event) {
    this.router.navigate([Const.UrlSetting.U0000]);
  }

  /**
   * 行を選択する処理
   *
   * @param $event イベント
   * @param selectedItem 行選択 値取得
   */
  public onSelHighLight($event, selectedItem) {
    this.commonComponent.CommonOnSelHight($event);
    this.selected = true
    this.personalID = selectedItem.personalID;
    this.employeeCode = selectedItem.employeeCode;
    this.employeeName = selectedItem.employeeName;
    this.approval1 = selectedItem.approval1;
    this.approval2 = selectedItem.approval2;
    this.deleteFlag = selectedItem.deleteFlag;
    this.index = this.orderApprovalData.indexOf(selectedItem);
  }
}
