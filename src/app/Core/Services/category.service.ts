import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environments/Environmment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  //api
  constructor(private readonly _HttpClient:HttpClient) { }

  getAllCategories():Observable<any>
  {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories`);
  }

  getSpecificCategories(id:string):Observable<any>
  {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories/${id}`);
  }

}
