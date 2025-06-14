import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from '../Environments/Environmment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:any = null;
  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);

  setRegisterData(data:object):Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data);
  }

  setLoginData(data:object):Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data);
  }

  saveUserData():void{
    if(localStorage.getItem('userToken') !== null){
      this.userData = jwtDecode(localStorage.getItem('userToken') !)
    }
  }

  signOut():void{
    //token = null
    localStorage.removeItem('userToken');

    //userdata = null
    this.userData = null;

    //call api to remove token it doc need
    //navigate to login
    this._Router.navigate(['/login']);
  }

  setVerifyEmail(data:object):Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data);
  }

  setVerifyCode(data:object):Observable<any>
  {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data);
  }

  setResetPassword(data:object):Observable<any>
  {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data);
  }
}
