import { Component, OnInit } from '@angular/core';
import {faDesktop, faList, faUsers, faUserTimes, faQrcode} from '@fortawesome/free-solid-svg-icons'
import { WelcomeService } from 'src/app/services/welcome.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-land-page',
  templateUrl: './admin-land-page.component.html',
  styleUrls: ['./admin-land-page.component.scss']
})

export class AdminLandPageComponent implements OnInit {
  users = faUsers ;
  scanning = faQrcode;
  help_desk = faDesktop;
  scanLogs = faList;
  Deactivate = faUserTimes;
  userData: any;
  userLists: any;
  TotalScannedToday: any;
  TotalEmployees: any;
  TotalHelpDesk: any;
  TotalDeactivatedUsers: any;
  spinnerState: boolean = false;
  
  constructor(private welcomeService: WelcomeService, private usersService: UsersService) { }
  
  ngOnInit(): void {
    this.welcomeSession();
    this.getAllEmployees();
    this.getAllScanLogs();
  }

  userDeactivatedUpdate(){
    this.getAllEmployees();
  }

  userActivatedUpdate(){
    this.getAllEmployees();
  }

  getAllScanLogs(){
    this.spinnerState = true;
    this.usersService.getAllScanLogs().subscribe((res)=>{
      this.spinnerState = false;
      const dateToday = (new Date()).toLocaleDateString('en-GB');
      this.TotalScannedToday = res.filter((scanLog:any) => {
        
        const scanLogDate = (new Date(scanLog.scanned_at)).toLocaleDateString('en-GB');
        return scanLogDate === dateToday;
      });
    }, (err) => {
      console.log(err)
    }) 
  }

  getAllEmployees(){
    this.spinnerState = true;
    this.usersService.getAllEmployees().subscribe((res)=>{
      this.spinnerState = false;
      this.TotalEmployees = res.filter((user:any) => {
        return user.role_id === 2;
      })

      this.TotalHelpDesk = res.filter((user:any) => {
        return user.role_id === 3;
      })

      this.TotalDeactivatedUsers = res.filter((user:any) => {
        return user.status === false;
      })

    })
  }

  welcomeSession(){
    return this.welcomeService.getUserProfile().subscribe((res:any) => {
      
      this.userData = res;
      console.log(this.userData);
    }, (err) => {
      console.log(err);
    })
  }

}
