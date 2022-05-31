import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  constructor(private http: HttpClient) { }
  private serverUrl = `${environment.apiUrl}`;

  getUserProfile(){
    return this.http.get<any>(`${this.serverUrl}user-profile`, {withCredentials: true}).pipe(map((res:any) => {
      console.log(res);
      return res;
    }))
  }
}