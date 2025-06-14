import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environments/Environmment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  myHeader:any = { token: localStorage.getItem('userToken') }

  constructor(private _HttpClient: HttpClient) { }

  // cashOrder(cartId:string):Observable<any>{
  //   return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/${cartId}`,
  //     {
  //       headers : this.myHeader
  //     }
  //   );
  // }

  checkOut(cartId: string|null, shippingDetails:object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${environment.urlServer}`,
      {
        "shippingAddress": shippingDetails,
      }
    );
  }
}
