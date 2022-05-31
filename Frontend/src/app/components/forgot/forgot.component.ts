import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import { MustMatch } from './_helpers/must-match.validator';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  forgotForm!: FormGroup;
  submitted = false;
  spinnerState: boolean = false;

  constructor(
    private authService: AuthService,
    private formbuilder: FormBuilder,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.forgotForm = this.formbuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        pwd: ['', [Validators.required, Validators.minLength(6)]],
        pwd1: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validator: MustMatch('pwd', 'pwd1'),
      }
    );
  }

  get f() {
    return this.forgotForm.controls;
  }

  submit() {
    this.spinnerState = true;
    this.submitted = true;

    if (this.forgotForm.invalid) {
      return;
    }else{
      this.authService.forgot(this.forgotForm.value).subscribe({
        next: (res) => {
          this.route.navigateByUrl('/login');
        },
        error: (err) => {
          console.log(err.error);
        }
      })
    }
  }

  forgot() {
    this.authService.forgot(this.forgotForm.value);
  }
}
