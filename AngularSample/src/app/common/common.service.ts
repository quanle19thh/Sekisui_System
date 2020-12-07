import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponseBody } from './ApiResponseBody'
import { ShHttpClientConst, ShRedirectService , ShHttpClientService, LoggerService } from 'sh-http-client';

declare var require: any;
const FileSaver = require('file-saver');

@Injectable()
export class CommonService{

    private baseUrl: string = "http://localhost:8080/api";

    private searchUrl: string;

    constructor(
        private shApiService: ShHttpClientService,
        private http: HttpClient,
    ){}

    // サーバよりデータを取得するのに、URLを渡すのが必要です。
    //　Any[]を列として返す。
    getMultipleData(url: string) : Observable<any[]>{
        return this.http.get<any[]>(url)
        .pipe(
            catchError(this.handleError<any[]>("Can't get Data from serve",[]))
        );
    }

    getSingleData(url: string): Observable<any>{
        return this.http.get<any>(url)
        .pipe(
            catchError(this.handleError<any>("Error excepted while getting data from server",[]))
        );
    }


    //　検索ボタンを押下する時、検索リンクを作成する。
    createSearchUrl(dataList: Object): string{

        this.searchUrl = this.baseUrl + '?';

        for (let key of Object.keys(dataList)){

            if(dataList[key] != '' && dataList[key] != null){
                this.searchUrl += `${key}=${dataList[key]}&`;
            }
        }
        return this.searchUrl.slice(0,-1);
    }

    // POST通信。
    getSearchRequest(urlName: string, data: any): Promise<ApiResponseBody<any>>{
        return this.http.post<any[]>(this.baseUrl + `/${urlName}/`, data)
        .toPromise()
        .then((res) => {
            const response: any = res;
            return response;
        })
        .catch(this.handleError);        
    }

    getDownLoad(urlName: string, data: any):Observable<any>{
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.set('Content-Type','application/json; charset=utf-8')
        let httpOptions = { observe:'response' as 'body', responseType: 'blob' as 'json', headers};
        return this.http.post(this.baseUrl + `/${urlName}/`, data, httpOptions);
    }


    //  エラーハンドル
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.log(error.error);
          return of(result as T)
        };
    }

    getAuthorizationSearch(url: string, data: any): Promise<ApiResponseBody<any>>{
        return this.shApiService.post<any[]>(this.baseUrl + `/${url}/`, data)
        .then((res => {
            const response: any = res;
            return response;
        }))
        .catch(this.handleError);
        // .toPromise();

    }

    

}
