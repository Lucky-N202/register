import { Component, OnInit } from '@angular/core';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WelcomeService } from 'src/app/services/welcome.service';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { icon } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  form!: FormGroup;
  profilePic:any;
  userData:any;
  backbtn = faArrowLeft;
  

  constructor(private welcomeService: WelcomeService, private userservive :UsersService, private router:Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      images: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
    this.welcomeSession();
  }

  get f(){
    return this.form.controls;
  }
  
  update(){
    this.spinnerState = true;
    this.userservive.updateEmployee(this.userData.user_id, this.form.value).subscribe({
      next: (res) =>{
        
        
        this.updateProfilePic();
        
        

      },
      error:(err) =>{
        console.log(err);
        this.spinnerState = false;
        return Swal.fire({
          title:'error!',
          text: err.error.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
        
      }
    })
  }
  profilePicChange(event:any) {
    if (event.target.files.length > 0) {
      this.profilePic = event.target.files[0];
      console.log(this.profilePic)
    }
  }
  spinnerState: boolean = false;


  
 async updateProfilePic(){
  this.spinnerState = true;
    const formData = new FormData()
    formData.append('images', this.profilePic)
    console.log('image i found')
    console.log(formData.get('images'));
    this.userservive.updateProfilePic(this.userData.user_id, formData).subscribe({
      next: (res) =>{
        this.spinnerState = false;
        this.router.navigateByUrl("/user-profile")
        return Swal.fire({
          title: 'Success!',
          text: 'Successfully Updated',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        
      },error:(err) =>{
        console.log(err);
      }
    })
  }

  welcomeSession(){
    return this.welcomeService.getUserProfile().subscribe((res:any) => {
      console.log(res);
      this.userData = res;
      const formControls = this.form.controls;


      formControls['username'].setValue(res.username);
      formControls['surname'].setValue(res.surname);
      formControls['email'].setValue(res.email);
    }, (err) => {
      console.log(err);
    })
  }

}