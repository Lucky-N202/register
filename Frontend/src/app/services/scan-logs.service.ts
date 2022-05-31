import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import{map} from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ScanLogsService {

  constructor(private http: HttpClient) { }
  private serverUrl = `${environment.apiUrl}`;

  postCovidDetails(data:any){
    return this.http.put<any>(`${this.serverUrl}post-covid-details`,data,{withCredentials: true}).pipe(map((res:any) => {
      console.log(res);
      return res;
    }))
  }
  
  postScanLog(id:any){
    return this.http.post<any>(`${this.serverUrl}post-scan-log/${id}`, {scanLogData: '${id}'},{ withCredentials: true }).pipe(map((res:any) => {
      console.log(res);
      return res;
    }))
  }

  checkIfSignedForm(){
    return this.http.get<any>(`${this.serverUrl}covid-check`, { withCredentials: true }).pipe(map((res:any) => {
      console.log(res);
      return res;
    }))
  }

}
