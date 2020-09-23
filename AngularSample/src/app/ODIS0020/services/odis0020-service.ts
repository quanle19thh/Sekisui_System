import { ODIS0020OrderShiwake } from './../entities/odis0020-OrderDetailList.entity';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ODIS0020AddOrderDetail } from '../entities/odis0020-AddDetailForm.entity'

@Injectable({
    providedIn: 'root'
  })
/**
 * 発注明細入力発注明細入力_詳細入力サービス
 */
export class ODIS0020Service {

  // データの変更を通知するためのオブジェクト
  private closeEventSubject = new Subject<string>();

  /**
  * コンストラクタ
  *
  * @memberof ODIS0020Service
  */

  private _tableData: ODIS0020OrderShiwake[] = [];

  get returnedSplitData(){
    if(this._tableData.length <= 0){
      return [];
    }
    return this._tableData;
  }

  constructor() { }

  private _val


  public getVal() {
    return this._val;
  }

  /**
  * フォーカス対象の値をセット
  */
  public setVal(val:ODIS0020AddOrderDetail) {
    this._val = val;
  }

  setTableData(data: ODIS0020OrderShiwake[]){
    this._tableData = data;
  }

  clearReturn(){
    this._tableData = null;
  }

}