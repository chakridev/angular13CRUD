import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postProducts(data: any){
    return this.http.post<any>("http://localhost:3000/productlist/",data);
  }

  getProducts(){
    return this.http.get<any>("http://localhost:3000/productlist/");
  }

  putProducts(data: any,id : number){
    return this.http.put<any>("http://localhost:3000/productlist/"+id,data);
  }

  deleteProducts(id : number){
    return this.http.delete<any>("http://localhost:3000/productlist/"+id);
  }

}
