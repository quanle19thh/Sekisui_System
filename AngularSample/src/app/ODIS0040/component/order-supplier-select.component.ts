import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderSupplierSelectService } from '../services/order-supplier-select.service';
import { OrderSupplierSelectType } from '../entities/odis0040.entity'
import { CommonComponent } from '../../common/common.component'
import { CommonService } from '../../common/common.service';
import { ODIS0020Service } from '../../ODIS0020/services/odis0020-service';
import { Const } from '../../common/const';
import { ODIS0040Form } from '../entities/odis0040-Form.entity'

@Component({
    selector: 'order-Supplier-select',
    templateUrl: './order-Supplier-select.component.html',
    styleUrls: ['../../common/common.component.css',
                './order-supplier-select.component.css']
})

/**
 * 発注先マスタ選択コンポーネント
 */
export class OrderSupplierSelectComponent implements OnInit, OnDestroy  {

  // タイトル
  title = '発注先マスタ選択';

  // 画面表示データ
  datas: OrderSupplierSelectType[];

  // 戻り値
  resVal:OrderSupplierSelectType;

  // パラメータ
  param = new ODIS0040Form();

  // エラーメッセージ
  errormsg:string ="";

  /**
   * コンストラクタ
   *
   * @param {ModalService} modalService
   * @memberof ModalComponent
   */
  constructor(
    private modalService: OrderSupplierSelectService,
    private commonComponent: CommonComponent,
    private orderService: CommonService,
    private ODIS0020Service: ODIS0020Service,
  ) {}
  
  /**
   * 初期処理
   */
  ngOnInit() {

    // this.getOrderInputData();
    
    
    this.mockingData();

  }

  mockingData(){
      // url
    let _supplierSelect: string = "assets/data/odis0040-SupplierSelect.json";
    this.orderService.getSingleData(_supplierSelect)
    .subscribe(
      data => {
        if (data !== undefined) {
          this.datas = data;

      }
    });

  }

  /**
   * 終了時
  */
  ngOnDestroy() {}

   /**
   * テーブル クリック 選択背景 設定
   *
   * @param $event イベント
   * @param selectedItem 行選択 値取得
   */
  public onSelHighLight($event, selectedItem){
  
    this.resVal = selectedItem;
    // 背景色 設定
    this.commonComponent.CommonOnSelHight($event);

  }

  /**
   * 閉じるボタン
   */
  public onCloseClick() {
    this.modalService.requestCloseModal();
  }

  /**
  * 選択ボタン
  */
  public onChooseClick($event) {
    
    if(this.resVal == undefined ||this.resVal == null){
        this.errormsg = Const.ErrorMsg.E0008;
        $event.stopPropagation();
    }
    else{
      this.modalService.requestChooseVal(this.resVal);
    }
  }

  /**
  * JSONファイルをdatasに格納
  */
  getOrderInputData(){

     // Todo　システムログイン情報から取得すること！
     // 事業区分コード設定
     this.param.officeCode = '701000';

     // 発注仕訳マスタ取得
     this.orderService.getSearchRequest(Const.UrlLinkName.S0004_Init,this.param)
       .then(
         (response) => {
           this.datas = response;
         }
       );
  }

}