import { Component, OnInit, ChangeDetectorRef, NgModule} from '@angular/core';
import { OrderDetail,OrderSearchInputment } from './orderDetail';
import { testData} from './test-order-detail';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-detail-approval',
  templateUrl: './order-detail-approval.component.html',
  styleUrls: ['./order-detail-approval.component.css']
})

export class OrderDetailApprovalComponent implements OnInit {

  recordMax: number = 0;
  pageIndex: number = 0;
  pageMax: number = 0;
  pageSize: number = 20;


  pageTitle = "発注明細入力＿承認処理";

  datas: OrderDetail[] = testData;

  inputment: OrderSearchInputment
  test:string = "quan";

  constructor(
    private router : ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
      ) { }


  ngOnInit() {
    this.countRecord(this.datas);
    //TODO: Display result
    }

    getSearchRequest(){

      //TODO: Input Checked

      alert("Clicked!!!");
      return;
    }

    checkInputment(input: OrderSearchInputment ){


      if (input.contractNumFrom.length == 0){

      }

    }

  
  countRecord(datas: OrderDetail[]){
    if (datas.length == 0){
      alert("該当データがありません。");
      return;
    }
    if (datas.length > 1000){
      alert("検索結果が1000件を超えています。絞り込んでください。");
      return;
    }

    this.recordMax = datas.length;
    this.pageMax = Math.floor(datas.length/this.pageSize);
    this.changeDetectorRef.detectChanges();
  }

  setPageIndex (pageIndex){
    this.pageIndex = pageIndex;
  }

pageJump(input: any){
  if (!Number(input.value)){
    alert("入力ページは数字のみです。");
    return;
  }
  if (Number(input.value)> this.pageMax || Number(input.value) <0){
    alert("不明なページです。選択可能なページ：" + "0 ~ "+this.pageMax);
    return;
  }

  this.pageIndex = Number(input.value);
}

pageNext(){
  if(this.pageIndex < this.pageMax){
    this.pageIndex = this.pageIndex++;
  }
  if (this.pageIndex = this.pageMax){
    alert("最大のページです。");
    return;
  }

}


pagePrevious(){
  if(this.pageIndex < this.pageMax ){
    this.pageIndex = this.pageIndex --;
  }
  if (this.pageIndex = 1){
    alert("最初のページです。");
    return;
  }
}

displayResult(pageNumber: any){

}



}




