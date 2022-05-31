import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faArrowLeft, faPowerOff,faUserPlus, faUser, faList, faBars,faSignOutAlt, faTimes,faTachometerAlt} from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { WelcomeService } from 'src/app/services/welcome.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements AfterViewInit {
  userData: any;
  btnClose = faTimes;
  logoutbtn = faSignOutAlt;
  menuBar = faBars;
  backbtn = faArrowLeft;
  addUser = faUserPlus;
  users = faUser;
  scanLogs = faList;
  sideNavBar = false;
  status: boolean = false;
  register: any;
  userlist: any;
  scanlogsUrl:any;
  admin_dashboard:any;
  dashboard = faTachometerAlt;






  clickEvent(){
      this.status = !this.status;
  }
    constructor(private route:Router,private authService: AuthService, private welcomeService: WelcomeService, private elementRef: ElementRef){
    }
    ngOnInit(): void{
      this.welcomeSession();

      this.route.events.subscribe(
        (event: any) => {
          if (event instanceof NavigationEnd) {
            if(this.route.url === '/login' || this.route.url === '/generate' || this.route.url === '/create-password'
             || this.route.url === '/qrcode' || this.route.url === '/covid' || this.route.url === '/update-profile' || this.route.url.search('/user-profile') !== -1 ||  this.route.url === '/nav-btm' ||  this.route.url === '/scan' || this.route.url === '/reset-password'
             || this.route.url.search('/reset-password') !== -1 ){
              this.sideNavBar =false
            }
            else{
              this.sideNavBar = true;
            }
          }
        }
      );

      this.route.events.subscribe(
        (event: any) => {
          if (event instanceof NavigationEnd) {
            if(this.route.url === '/register'){
              this.register =true;
            }else
            {
              this.register =false;
            }
             if(this.route.url === '/user-list'){
              this.userlist= true;
            }else
            {
              this.userlist =false;
            }

            if(this.route.url === '/scan-logs'){
                this.scanlogsUrl = true;
            }
            else
            {
              this.scanlogsUrl =false;
            }

            if(this.route.url === '/admin-dashboard'){
              this.admin_dashboard= true;
           }
           else
          {
            this.admin_dashboard=false;
          }
          }
        }
      );
    }


    ngAfterViewInit() {
      this.elementRef.nativeElement.ownerDocument
          .body.style.backgroundColor = '#EFEFFF';
  }


  title = 'Ontime';


  logOut(){
    return this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.route.navigateByUrl('/login');
      },

      error: (err) => {
        alert(err);
      }
  })
  }
  welcomeSession(){
    return this.welcomeService.getUserProfile().subscribe((res:any) => {
      console.log(res);
      this.userData = res;
    }, (err) => {
      // alert(err.error);
      console.log(err.error)
    })
  }

}

