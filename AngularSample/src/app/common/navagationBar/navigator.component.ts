import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css'],
})

export class AppNavigator implements OnInit {

  branchName: string;
  loginUser: string;
  displayDate: any;
  systemDate: Date = new Date();
  day: string[] = ["日", "月", "火", "水", "木", "金", "土"];

  time = new Date();

  constructor() {

  }

  ngOnInit(): void {

    this.loginUser = '積水　次郎';
    this.branchName = '大阪北支店';

    this.displayDate = this.getSystemDate();
  }

  /**
  * ロカールに時刻を取得する
  */
  ngAfterViewInit() {
    setInterval(() => {
      this.systemDate = new Date();
      this.displayDate = this.getSystemDate();
    }, 1000);
  }
  /**
   * システム日付を取得する
   */
  getSystemDate(): string {
    return `${this.systemDate.toLocaleDateString()}(${this.day[this.systemDate.getDay()]}) ${this.systemDate.toLocaleTimeString().slice(0, -3)}`;
  }

  public logoClick($event) {

  }

  public logOut($event) {

  }

} 