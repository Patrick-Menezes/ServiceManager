import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})

export class ServiceManager {


constructor(private http: HttpClient) {}

getData(): any {
  return this.http.get('https://localhost:7138/swagger/v1/swagger.json');   

}
}


