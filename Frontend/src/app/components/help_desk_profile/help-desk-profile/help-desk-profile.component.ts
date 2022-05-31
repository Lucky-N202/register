import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { faPowerOff,faBars} from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';

@Component({
  selector: 'app-help-desk-profile',
  templateUrl: './help-desk-profile.component.html',
  styleUrls: ['./help-desk-profile.component.scss']
  
})
export class HelpDeskProfileComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  logout =faPowerOff;
  menuBar =faBars;

  constructor(private formBuilder: FormBuilder,private route:Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(1)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(1)]),
      company_name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      last_scan: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
  }
  get f() {
    return this.form.controls;
  }
  submit() {
    console.log(this.form.controls['role'])
    this.submitted = true;
    const formData = new FormData();
  }

}
