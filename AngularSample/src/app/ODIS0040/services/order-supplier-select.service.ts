import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OrderSupplierSelectType } from '../entities/odis0040.entity'

@Injectable({
    providedIn: 'root'
  })
 
/**
 * 発注先マスタ選択サービス
 */
export class OrderSupplierSelectService {

  // データの変更を通知するためのオブジェクト
  private closeEventSubject = new Subject<string>();
  
  // Subscribe するためのプロパティ( これでイベント通知をキャッチする )
  public closeEventObservable$ = this.closeEventSubject.asObservable();
  /**
   * コンストラクタ
   *
   * @memberof OrderSupplierSelectService
   */
  constructor() { }

  private _val = new OrderSupplierSelectType();

  public getVal() {
    return this._val;
  }

  /**
  * 戻り値をセット
  */
  public setVal(val:OrderSupplierSelectType) {
    this._val = val;
  }

  /**
   * イベント通知のリクエストを処理する( モーダルダイアログを閉じる )
   *
   * @memberof OrderSupplierSelectService
   */
  /**
  * モーダルを閉じる
  */
  public requestCloseModal() {
    //閉じるボタンの押下後、戻り値を初期化する
    this.setVal(null);
    this.closeEventSubject.next();
  }
  /**
  * 戻り値をセットしてモーダルを閉じる
  */
  public requestChooseVal(resVal:OrderSupplierSelectType) {
    this.setVal(resVal)
    this.closeEventSubject.next();
  }


}