import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OrderJournalSelectType } from '../entities/odis0030.entity'

@Injectable({
    providedIn: 'root'
  })
  
/**
 * 発注仕訳マスタ選択サービス
 */
export class OrderJournalSelectService {

  // データの変更を通知するためのオブジェクト
  private closeEventSubject = new Subject<string>();
  
  // Subscribe するためのプロパティ( これでイベント通知をキャッチする )
  public closeEventObservable$ = this.closeEventSubject.asObservable();

  /**
   * コンストラクタ
   *
   * @memberof OrderJournalSelectService
   */
  constructor() { }

  private _val = new OrderJournalSelectType();

  public getVal() {
    return this._val;
  }

  /**
  * 戻り値をセット
  */
  public setVal(val:OrderJournalSelectType) {
    this._val = val;
  }

  /**
   * イベント通知のリクエストを処理する( モーダルダイアログを閉じる )
   *
   * @memberof OrderJournalSelectService
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
  * 戻り値をセットして、モーダルを閉じる
  */
  public requestChooseVal(resVal:OrderJournalSelectType) {
    this.setVal(resVal);
    this.closeEventSubject.next();
  }

}