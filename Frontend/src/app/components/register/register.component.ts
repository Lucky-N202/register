import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { RegistrationService } from 'src/app/services/registration.service'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  allFiles: File[] = [];
  deleteBtn = faTrash;
  spinnerState: boolean = false;


  constructor(private formBuilder: FormBuilder, private registrationServices: RegistrationService, private route:Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(1)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(1)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });

  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.spinnerState = true;
    console.log(this.form.controls['role'])
    this.submitted = true;
    const formData = new FormData();

    if(this.form.invalid && !this.allFiles.length){
      return Swal.fire({
        title: 'Error!',
        text: 'registration invalid',
        icon: 'error',
        confirmButtonText: 'Cool'
      })

    }
    else{
      this.submitted = false;
      if(this.allFiles.length > 0){
        formData.append('file', this.allFiles[0]);

        return this.registrationServices.create_many(formData).subscribe({
          next: (res) => {
            this.route.navigateByUrl('/user-list')
            return Swal.fire({
              title: 'Success!',
              text: 'Successfully Registered',
              icon: 'success',
              confirmButtonText: 'Cool'
            })
          },
          error: (err) => {
            console.log(err);
            return Swal.fire({
              title: 'Error!',
              text: err.error.message,
              icon: 'error',
              confirmButtonText: 'Cool'
            })
          }
        })

      }else{
        formData.append('username', this.form.value.username)
        formData.append('surname', this.form.value.surname)
        formData.append('email', this.form.value.email)
        formData.append('role', this.form.value.role)

        return this.registrationServices.create(formData).subscribe({
          next: (res) => {
            this.route.navigateByUrl('/user-list')
            return Swal.fire({
              title: 'Success!',
              text: 'Successfully Registered',
              icon: 'success',
              confirmButtonText: 'Cool'
            })
          },
          error: (err) => {
            return Swal.fire({
              title: 'Error!',
              text: err.error.message,
              icon: 'error',
              confirmButtonText: 'Cool'
            })
          }
        })
      }

    }
  }

  droppedFiles(allFiles: File[]): void {
    const filesAmount = allFiles.length;
    for (let i = 0; i < filesAmount; i++) {
      const file = [allFiles[i]];
      if(file[0].type === 'text/csv'){
        this.allFiles = file;
      }else{
        this.allFiles = [];
        Swal.fire({
          title: 'Error!',
          text: 'Only csv files are permitted',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
      console.log(this.allFiles);
    }
  }

  selectedFiles(event: any): void {
    const filesAmount = event.target.files;
      const file = [filesAmount];
      if(file[0].length && file[0][0].type === 'text/csv'){
        console.log(file[0]);
        this.allFiles = [];
        this.allFiles = file[0];
      }else{
        if(file[0].length){
          this.allFiles = [];
          Swal.fire({
            title: 'Error!',
            text: 'Only csv files are permitted',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        }else{
          this.allFiles = [];
        }
      }
    }

  deletefile(){
    this.allFiles = [];
  }

}
