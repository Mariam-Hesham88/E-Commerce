import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../Environments/Environmment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  myHeader:any = { token : localStorage.getItem('userToken')};
  // countOfCartItem : BehaviorSubject<number> = new BehaviorSubject(0);
  countOfCartItem : WritableSignal<number> = signal(0);

  constructor(private _HttpClient:HttpClient) { }

  addProducrToCart(Id:string):Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        "productId": Id
      }
    );
  }

  updateCartProductCount(Id:string, newCount:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${Id}`,
      {
        "count": newCount
      }
    );
  }

  getLoggedUserCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`);
  }

  removeSpecificCartItem(Id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${Id}`);
  }

  clearAllCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`);
  }
}
