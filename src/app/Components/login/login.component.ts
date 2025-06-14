import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/Services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errorMsg:string = '';
  isloading:boolean = false;
  successMsg:boolean = false;
  
  private readonly _AuthService = inject(AuthService);  
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  
  loginForm:FormGroup = this._FormBuilder.group({
    email:[null,[Validators.required, Validators.email]],
    password:[null,[Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });
  
    // loginForm:FormGroup = new FormGroup({
    //   email: new FormControl(null,[Validators.required, Validators.email]),
    //   password: new FormControl(null,[Validators.required, Validators.pattern(/^\w{6,}$/)]),
    // });

  loginSumbit():void{
    this.isloading=true;
    if(this.loginForm.valid){
      //console.log(this.loginForm);
      this._AuthService.setLoginData(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.isloading = false;
          //go to login page
          if(res.message == 'success'){
            this.successMsg=true;
            setTimeout(() => {
              localStorage.setItem('userToken', res.token);
              this._AuthService.saveUserData();
              this._Router.navigate(['/home'])
            }, 2000);
          }
        },
        error:(err:HttpErrorResponse)=> {
          this.errorMsg = err.error.message;
          this.isloading = false;
          console.log(err);
        },
      })
    }
    else{
      this.loginForm.setErrors({mismatch:true});
      this.loginForm.markAllAsTouched();
    }
  }
}
