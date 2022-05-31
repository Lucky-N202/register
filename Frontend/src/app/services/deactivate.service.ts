import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeactivateService {
  
  constructor(private http: HttpClient) { }
  private serverUrl = `${environment.apiUrl}`;

  deactivateAEmployee(id: number){
    return this.http.put<any>(`${this.serverUrl}deactivate/${id}`,{deactivateData: `${id}`},{withCredentials: true}).pipe(map((res:any) => {
      console.log(res);
      return res;
    }))
  
  }
  
}
