import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faPowerOff,faUserPlus, faUser, faList,faBars, faUserCircle, faArrowRight, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { WelcomeService} from '../../services/welcome.service'

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss']
})
export class MobileNavComponent implements OnInit {
  logoutbtn = faSignOutAlt;
  menuBar =faBars;
  user: any;
  users = faUserCircle;
  isSecurity!: boolean;

  constructor(private authService:AuthService, private route:Router, private welcome: WelcomeService) { }

  ngOnInit(): void {
    this.getUserImage()
  }


  logOut(){
    return this.authService.logout().subscribe((res) => {
      console.log(res);
      this.route.navigateByUrl('/login');
    }, (err) => {
      console.log(err);
    })
  }

  getUserImage(){
    return this.welcome.getUserProfile().subscribe({
      next: (res) => {
        this.user = res;
        if(this.user.role === 'help_desk'){
          this.isSecurity = true;
        }
        
    }, error: (err) =>{
      console.log(err)
    }
  })

  }




}
