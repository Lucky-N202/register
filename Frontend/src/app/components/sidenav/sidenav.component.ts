import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { WelcomeService } from 'src/app/services/welcome.service';
import { Router } from '@angular/router';
import { faArrowLeft, faPowerOff,faUserPlus, faUser, faList } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  userData: any;
  logoutbtn = faPowerOff;
  backbtn = faArrowLeft;
  addUser = faUserPlus;
  users = faUser;
  scanLogs = faList;
  
 

  constructor(private welcomeService: WelcomeService, private authService: AuthService, private route:Router){}

  ngOnInit(): void {
  }

  logOut(){
    return this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.route.navigateByUrl('/login');
      }, 
      
      error: (err) => {
        console.log(err);
      }
  })
  }

  welcomeSession(){
    return this.welcomeService.getUserProfile().subscribe((res:any) => {
      console.log(res);
      this.userData = res;
    }, (err) => {
      console.log(err.error);
    })
  }

}
