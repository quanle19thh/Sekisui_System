import { SplitOrderDetailShiwake, SplitOrderDetailSplit } from '../entities/odis0060.entity';
import { ODIS0020OrderDetailList } from '../../ODIS0020/entities/odis0020-OrderDetailList.entity';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SplitOrderDetailService {

  //TODO: add URL to Server
  // private _url: string = "/order-detail-approval/data/data.json";

  // データの変更を通知するためのオブジェクト
  private closeEventSubject = new Subject<string>();

  // Subscribe するためのプロパティ( これでイベント通知をキャッチする )
  public closeEventObservable$ = this.closeEventSubject.asObservable();

  private _urlShiwake: string = "assets/data/splitDataShiwake.json";
  private _urlSplitOrder: string = "assets/data/dataSplitOrder.json";

  /**
   * コンストラクタ
   *
   * @memberof OrderJournalSelectService
   */
  constructor(
    private http: HttpClient
  ) { }

  private _val1

  public getVal1() {
    return this._val1;
  }
  public setVal1(val1: string) {
    this._val1 = val1;

  }

  private _val2


  public getVal2() {
    return this._val2;
  }
  public setVal2(val2: string) {
    this._val2 = val2;
  }

  private _val3


  public getVal3() {
    return this._val3;
  }
  public setVal3(val3: string) {
    this._val3 = val3;
  }

  private _val4


  public getVal4() {
    return this._val4;
  }
  public setVal4(val4: string) {
    this._val4 = val4;
  }

  private _splitTable;

  public getSplitTable() {
    return this._splitTable;
  }

  public setSplitTable(splitTable: SplitOrderDetailShiwake[]) {
    this._splitTable = splitTable;
  }

  private _detailTable;

  public getDetailTable() {
    return this._detailTable;
  }

  public setDetailTable(detailTable: SplitOrderDetailSplit[]) {
    this._detailTable = detailTable;
  }
}