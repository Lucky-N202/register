import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { faArrowLeft, faPowerOff,faUserPlus, faUser, faList } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss']
})
export class GenerateComponent implements OnInit {

  constructor(private authService: AuthService,private formbuilder: FormBuilder, private route:Router) { }
  generateForm!: FormGroup;
  backbtn = faArrowLeft;
  spinnerState: boolean = false;
  // check for data,and  the type of data, length
  ngOnInit(): void {
    this.generateForm = this.formbuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  get Form(){
    return this.generateForm.controls;
  } 

  submit () {
    this.spinnerState = true;
    console.log(this.generateForm.value);
    this.authService.resetEmail(this.generateForm.value).subscribe((res) => {
      console.log(res);
      this.route.navigateByUrl('/login');
    },
    (err) => {
      console.log(err);
      return Swal.fire({
        title: 'Error!',
        text: err.error.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })
    
  }


}

