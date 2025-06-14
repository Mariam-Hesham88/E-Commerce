import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/Services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy{
  errorMsg:string = '';
  isloading:boolean = false;
  successMsg:boolean = false;
  registerSubscribe !: Subscription;

  private readonly _AuthService = inject(AuthService);  
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  registerForm:FormGroup = this._FormBuilder.group({
    name:[null,[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email:[null,[Validators.required, Validators.email]],
    password:[null,[Validators.required, Validators.pattern(/^\w{6,}$/)]],
    rePassword:[null],
    phone:[null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  },{validators:[this.ConfirmPassword]});

  // registerForm:FormGroup = new FormGroup({
  //   name: new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
  //   email: new FormControl(null,[Validators.required, Validators.email]),
  //   password: new FormControl(null,[Validators.required, Validators.pattern(/^\w{6,}$/)]),
  //   rePassword: new FormControl(null),
  //   phone: new FormControl(null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  // }, this.ConfirmPassword);

  //ConfirmPassword Validation
  ConfirmPassword(rf : AbstractControl){
    if(rf.get('password')?.value === rf.get('rePassword')?.value){
      return null
    }
    else{
      return {mismatch:true}
    }
  }

  registerSumbit():void{
    this.isloading=true;
    if(this.registerForm.valid){
      console.log(this.registerForm);
      this.registerSubscribe = this._AuthService.setRegisterData(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.isloading = false;
          if(res.message == 'success'){
            this.successMsg=true;
            setTimeout(() => {
              //1.take Token
              localStorage.setItem('userToken', res.token);
              //2.decode token
              this._AuthService.saveUserData();
              //3.navigate to home
              this._Router.navigate(['/login']);
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
      this.registerForm.setErrors({mismatch:true});
      this.registerForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.registerSubscribe?.unsubscribe();
  }
  
  }

