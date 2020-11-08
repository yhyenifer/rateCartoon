import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cartoon {
  title: string,
  img: string,
  year: string
}

/**
* @Injectable CartoonService
* @description servicio las historietas
* @author Yenifer Hernandez
* @date 08/11/2020
*/
@Injectable()
export class CartoonService{
  public url: string;


  constructor(private http: HttpClient){ }
/**
 * @function searchCartoons()
 * @description funcion para lanzar la peticion de consulta de historitas
 * @param number numero de historieta a ser consultada
 * @author Yenifer Hernandez
 * @date 08/11/2020
 */ 
  searchCartoons(number):Observable<Cartoon[]>{
  
    // url para uso productivo
    this.url = `https://xkcd.com/${number}/info.0.json`;
      // url para uso de proxy local
    //this.url = `api/${number}/info.0.json`;
    return this.http.get<Cartoon[]>(this.url);
  }

}