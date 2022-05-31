import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import{map} from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  
  constructor(private http: HttpClient) { }
  private serverUrl = `${environment.apiUrl}`;
  
  // Pagination
  getUsers(page: number){
    return this.http.get(this.serverUrl  + '?page=' + page);
  }

  getUserProfile(){
    return this.http.get<any>(`${this.serverUrl}user-profile`, {withCredentials: true}).pipe(map((res:any) => {
      console.log(res);
      return res;
    }))
  }

  getAllEmployees(){
    return this.http.get<any>(`${this.serverUrl}all-employees`,{withCredentials: true}).pipe(map((res:any) => {
      console.log(res);
      return res;
    }))
  }

  getAllScanLogs(){
    return this.http.get<any>(`${this.serverUrl}all-scanlogs`,{withCredentials: true}).pipe(map((res:any) => {
      console.log(res);
      return res;
    }))
  }

  getUser(id:any){
    return this.http.get<any>(`${this.serverUrl}user-profile/${id}`,{withCredentials: true}).pipe(map((res:any) => {
      console.log(res);
      return res;
    }))
  }

  updateProfilePic(id:any, images:any){
    return this.http.post<any>(`${this.serverUrl}/uploadToCloud/${id}`,images,{withCredentials: true}).pipe(map((res:any) => {
      console.log(res);
      return res;
    }))
  }

  getFilteredLogs(data:any): Observable<any>{
    return this.http.post<any>(`${this.serverUrl}all-scanlogs-searched`, data,{withCredentials: true})
  }

  postScanLogs(data:any){
    return this.http.post<any>(`${this.serverUrl}all-scanlogs`,data,{withCredentials: true}).pipe(map((res:any) => {
      console.log(res);
      return res;
    }))
  }
  
  updateEmployee(id: number, data:any){
    return this.http.put<any>(`${this.serverUrl}update-profile/${id}`,data,{withCredentials: true}).pipe(map((res:any) => {
      console.log(res);
      return res;
    }))
  }

}