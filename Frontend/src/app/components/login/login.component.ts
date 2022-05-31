import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,private formbuilder: FormBuilder, private route:Router) { }
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: new FormControl('', [Validators.required]),
      pwd: new FormControl('', [Validators.required])

    });
  }
     // in case of an invalid login ,remaim on login
  get Form(){
    return this.loginForm.controls;

  }
  spinnerState: boolean = false;
  login(){
    this.spinnerState = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
      console.log(res)
      if(res.role === 1){
        return this.route.navigateByUrl('/admin-dashboard');
      }else if(res.role === 2){
        return this.route.navigateByUrl('/qrcode');
      }else{
        return this.route.navigateByUrl('/scan');
      }
      
    }, 
    
    error:(err) =>{
      this.spinnerState = false;
      console.log(err);
      return Swal.fire({
        title:'Enter correct Password!',
        text: err.error.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      
    }
    
    
  })
  }

}

