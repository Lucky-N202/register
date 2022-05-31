import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MustMatch } from '../forgot/_helpers/must-match.validator';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  submitted = false;
  
  

  constructor(private authService: AuthService, private formbuilder: FormBuilder, private route: Router, private activatedroute: ActivatedRoute) {}

  ngOnInit(): void {
    this.resetForm= this.formbuilder.group(
      {
        pwd: ['', [Validators.required, Validators.minLength(6)]],
        pwd1: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validator: MustMatch('pwd', 'pwd1'),
      }
    );
  }
  get f() {
    return this.resetForm.controls;
  }
  submit() {
    this.submitted = true;

    if (this.resetForm.invalid) {
      //console.log(this.resetForm.controls)
      return;
    }else{
      const token = this.activatedroute.snapshot.paramMap.get('token');
      this.authService.passReset(this.resetForm.value, token).subscribe({
        next: (res) => {
          this.route.navigateByUrl('/login');
          return Swal.fire({
            title:'Success!',
            text: 'Password has been successfully ressetted',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        },

        error: (err) => {
          console.log(err.error);
          return Swal.fire({
            title:'error!',
            text: err.error.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }
      })
    }
  }

  // resetUserForm(form:any) {
  //   console.log(form)
  //   if (form.valid) {
  //     const token = this.activatedroute.snapshot.paramMap.get('token');
  //     this.submitted  = true;
  //     this.authService.passReset(this.resetForm.value, token).subscribe(
  //       data => {
  
  //         return Swal.fire({
  //           title:'error!',
  //           text: 'Password has been successfully ressetted',
  //           icon: 'error',
  //           confirmButtonText: 'Ok'
  //         })
  //       },
  //       err => {
  //         return Swal.fire({
  //           title:'error!',
  //           text: err.error.message,
  //           icon: 'error',
  //           confirmButtonText: 'Ok'
  //         })
  //       }
  //     );
  //   } else {
  //     this.submitted = false;
  //   }
  // }


    
}


