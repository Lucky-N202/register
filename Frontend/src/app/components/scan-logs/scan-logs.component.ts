import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-scan-logs',
  templateUrl: './scan-logs.component.html',
  styleUrls: ['./scan-logs.component.scss']
})
export class ScanLogsComponent implements OnInit {
  userScanLogs:any;
  p: number = 1;
  total: number = 0;
  user:any;
  constructor(private http: HttpClient, private usersService:UsersService,private formbuilder: FormBuilder) { }
   scanLogs!: FormGroup;

  ngOnInit(): void { 
    this.scanLogs = this.formbuilder.group({
      startDate : new FormControl(''),
      endDate : new FormControl('')
    })
    this.getAllScanLogs();
    // this.getUsers()
  }
  // pagination
  getUsers(){
    this.usersService.getUsers(this.p)
      .subscribe((response: any) => {
        console.log(response)
        this.user = response.data;
        this.total = response.total;
      }, (err) => {
        console.log(err)
      });
   } 
   pageChangeEvent(event: number){
    this.p = event;
    // this.getUsers();
    }

  getAllScanLogs(){
    const data:any={
      startDate:this.scanLogs.value.startDate,
      endDate:this.scanLogs.value.endDate,
    }
    
    if(Object.values(data)[0] === ""){
      this.usersService.getAllScanLogs().subscribe((res)=>{
        this.userScanLogs= res;
      })
      
    }else{
      this.usersService.getFilteredLogs(data).subscribe((res)=>{
        this.userScanLogs=res;
      })

    }
  }

}
