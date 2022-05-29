import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router,private http:HttpClient) { }

  isauthenticated():boolean{
    if (sessionStorage.getItem('token')!==null) {
        return true;
    }
    return false;
  }

  canAccess(){
    if (!this.isauthenticated()) {
        //redirect to login
        this.router.navigate(['/login']);
    }
  }
  canAuthenticate(){
    if (this.isauthenticated()) {
      //redirect to dashboard
      this.router.navigate(['/dashboard']);
    }
  }

  register(name:string,email:string,password:string){
      //send data to register api (firebase)
     return this.http
      .post<{idToken:string}>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJvKkXDopX6qia24MPRVAPPCvzKPXTvdA',
          {displayName:name,email,password}
      );
  }

  storeToken(token:string){
      sessionStorage.setItem('token',token);
  }

  login(email:string,password:string){
    //send data to login api (firebase)
      return this.http
      .post<{idToken:string}>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJvKkXDopX6qia24MPRVAPPCvzKPXTvdA',
            {email,password}
      );
  }

  detail(){
    let token = sessionStorage.getItem('token');

    return this.http.post<{users:Array<{localId:string,displayName:string}>}>(
        'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCJvKkXDopX6qia24MPRVAPPCvzKPXTvdA',
        {idToken:token}
    );
  }

  removeToken(){
    sessionStorage.removeItem('token');
  }



}


