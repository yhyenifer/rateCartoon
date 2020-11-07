import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cartoon {
  title: string,
  img: string,
  year: string
}
@Injectable()
export class CartoonService{
  public url: string;

  constructor(private _http: HttpClient){
  
  }

  searchCartoons(number):Observable<Cartoon[]>{
    console.log(number);
    this.url = `api/${number}/info.0.json`;
    //let headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true' });
    return this._http.get<Cartoon[]>(this.url);
  }

}