import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../Environments/Environmment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  //constructor() { }
  private readonly _HttpClient = inject(HttpClient)

  GetAllProducts():Observable<any>
  {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products`);
  }

  GetSpecificProducts(id:string | null):Observable<any>
  {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${id}`);
  }
}
