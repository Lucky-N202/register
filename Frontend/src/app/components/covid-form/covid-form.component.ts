import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ScanLogsService } from 'src/app/services/scan-logs.service';
import Swal from 'sweetalert2';
import { faArrowLeft, faPowerOff,faUserPlus, faUser, faList, faBars,faSignOutAlt, faTimes,faTachometerAlt} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-covid-form',
  templateUrl: './covid-form.component.html',
  styleUrls: ['./covid-form.component.scss']
})

export class CovidFormComponent implements OnInit {

  constructor(private formbuilder: FormBuilder, private route:Router, private scanLogsService: ScanLogsService) { }
  covidForm!: FormGroup;
  checkIfUserSignedToday: any;
  backbtn = faArrowLeft;

  ngOnInit(): void {
    this.checkIfUserSignedToday = setInterval(() => { this.checkIfSignedForm() }, 1000);
    
    this.covidForm = this.formbuilder.group({
      symptomControl: new FormControl('',[Validators.required, Validators.minLength(1)]),
      temparature: new FormControl('', [Validators.required, Validators.minLength(1)])
    });
  }
  
  submit(){
    
    this.scanLogsService.postCovidDetails(this.covidForm.value).subscribe({
      next: (res) => {
        this.route.navigateByUrl('/user-profile');
      }, 
      error: (err) => {
        return Swal.fire({
          title: 'Error!',
          text: err.error.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
    }
  })
  }

  checkIfSignedForm(){
    return this.scanLogsService.checkIfSignedForm().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        clearInterval(this.checkIfUserSignedToday);
        this.route.navigateByUrl('/user-profile');
      }
    })
  }
}
