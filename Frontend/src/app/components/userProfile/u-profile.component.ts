import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { WelcomeService } from 'src/app/services/welcome.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-u-profile',
  templateUrl: './u-profile.component.html',
  styleUrls: ['./u-profile.component.scss']
})

export class UProfileComponent implements OnInit {
  
  backbtn = faArrowLeft;
  user!:any;
  isUser!:boolean;
  isSecurity!:boolean;
  isLoggedIn!:boolean;
  
  constructor(
    private userService: UsersService,
    private activateRoute: ActivatedRoute,
    private welcomeService: WelcomeService
    ) { }
  
  ngOnInit(): void {
    const id = Number(this.activateRoute.snapshot.paramMap.get('user_id'));
    
    if(!id){
      this.welcomeService.getUserProfile().subscribe((res:any) => {
        console.log(res)
        this.user = res;
        this.isUser = true;
      })
    }else{
      this.userService.getUser(id).subscribe((res:any) => {
        this.user = res;
        console.log(res)
        this.isSecurity = true;
      }, (err) => {
        this.isSecurity = true;
        console.log(this.isSecurity)
        return Swal.fire({
          title: 'Error!',
          text: err.error.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      })
    }
   
  }

  

}