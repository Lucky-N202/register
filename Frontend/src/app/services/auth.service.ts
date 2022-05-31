import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }
  private serverUrl = `${environment.apiUrl}`;

  login(data: any){
    return this.http.post<any>(`${this.serverUrl}login`, data, {withCredentials: true}).pipe(map((res => {
      console.log(res)
      return res;
    })))
  }

  logout(){
    return this.http.get<any>(`${this.serverUrl}logout`, {withCredentials: true}).pipe(map((res => {
      console.log(res)
      return res;
    })))
  }

  forgot(data: any){
    return this.http.put<any>(`${this.serverUrl}create-password`, data, {withCredentials: true})
    .pipe(map((res =>{
      console.log(res);
      return res;
    })))
  }

  passReset(data: any, token: any){
    return this.http.put<any>(`${this.serverUrl}reset-password/${token}`, data, {withCredentials: true})
    .pipe(map((res =>{
      console.log(res);
      return res;
    })))
  }
  resetEmail(data: any){
    return this.http.put<any>(`${this.serverUrl}forgot-password`, data, {withCredentials: true})
    .pipe(map((res =>{
      console.log(res);
      return res;
    })))
  }

}
