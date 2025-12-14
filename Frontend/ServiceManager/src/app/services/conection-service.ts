import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError,Observable } from 'rxjs'; 
import { IserviceManager } from '../interface/IOrderServiceManager';
// componente standalone
standalone :true;

@Injectable({
  providedIn: 'root',
})

export class ConectionService  {


constructor(private _http:HttpClient) {}


// getOrders():Observable<any>{
//   return this._http.get('/swagger/v1/swagger.json');
// }

// API calls

// all orders
 GetOrderList():Observable<any>{
  return this._http.get('https://localhost:7138/api/OrderService/');
}


// search order by id
GetOrder(Id: Number):Observable<any>{
  return this._http.get('https://localhost:7138/api/OrderService/'+Id);
}

// delete order by id
DeteleOrder(Id: Number):Observable<any>{
  return this._http.delete('https://localhost:7138/api/OrderService/'+Id);
}

// create new order
CreateOrder(order:any):Observable<any>{
  return this._http.post('https://localhost:7138/api/OrderService/',order);
}

// Update order put
UpdateOrder(order:any):Observable<any>{
  return this._http.put('https://localhost:7138/api/OrderService/',order);
}

// Update order patch
PatchOrder(Id:Number ,order:any):Observable<any>{
  return this._http.patch('https://localhost:7138/api/OrderService/'+Id,order);
}



 
}