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
    this.url = `api/${number}/info.0.json`;
    return this._http.get<Cartoon[]>(this.url);
  }

}