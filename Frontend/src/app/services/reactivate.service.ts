import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import{map} from 'rxjs/operators'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReactivateService {

  constructor(private http: HttpClient) { }
  private serverUrl = `${environment.apiUrl}`;

  reactiavteAEmployee(id: number){
    return this.http.put<any>(`${this.serverUrl}reactivate/${id}`,{reactivateData: `${id}`},{withCredentials: true}).pipe(map((res:any) => {
      console.log(res);
      return res;
    }))
  
  }
}
