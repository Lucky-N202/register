import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import{map} from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {

constructor(private http: HttpClient){}
  private serverUrl = `${environment.apiUrl}`;
  
  create(user:any){
    return this.http.post<any>(`${this.serverUrl}register-single`,user, {withCredentials: true}).pipe(map((res:any) => {
      console.log(res);
      return res;
    }))
  }
  
  create_many(user:any){
    return this.http.post<any>(`${this.serverUrl}register-many`,user, {withCredentials: true}).pipe(map((res:any) => {
      console.log(res);
      return res;
    }))
  }
}