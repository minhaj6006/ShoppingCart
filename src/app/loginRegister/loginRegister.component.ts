import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { RegisterService } from '../services/register.service';



@Component({
  selector: 'app-loginRegister',
  templateUrl: './loginRegister.component.html',
  styleUrls: ['./loginRegister.component.css']
})
export class LoginRegisterComponent implements OnInit {

  hide = true;
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  validUsr: boolean = false;
  email!: string;
  password!: any;
  cPassword!: any;

  constructor(
    private loginService: LoginService,
    private registerService: RegisterService,
    private router: Router,
    private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    });

    this.registerForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email],),
      password: new FormControl("", [Validators.required,]),
      cPassword: new FormControl("", [Validators.required])
    });
  }

  loginUser() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value)
        .subscribe(result => {
          this.validUsr = result;
          if (this.validUsr === true) {
            this.router.navigate(['']);

          }
        })
    }
  }

  registerUser() {
    this.registerService.register(this.registerForm.value)
      .subscribe(data => {
        console.log(data);
        this.openSnackBar
        this.router.navigate(['/login']);
      });
  }

  openSnackBar() {
    if (this.registerForm.valid) {
      this._snackBar.open('Register Successfully.', '', {
        duration: 1000
      });
    } else if (this.loginForm.valid && this.validUsr === true) {
      this._snackBar.open('Login Successfully.', '', {
        duration: 1000
      });
    } else if (this.loginForm.valid && this.validUsr === false) {
      this._snackBar.open('The email or password is incorrect.', '', {
        duration: 1000
      });
    }
  }
}
