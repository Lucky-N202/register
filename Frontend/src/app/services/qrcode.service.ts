import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class QrcodeService {
  
  constructor(private http: HttpClient) { }
  private serverUrl = `${environment.apiUrl}`;
  
  checkIfScanned(){
    return this.http.get<any>(`${this.serverUrl}/scan-check`,{withCredentials: true}).pipe(map((res:any) => {
      console.log(res);
      return res;
    }))
  }

}