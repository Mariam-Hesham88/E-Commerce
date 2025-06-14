import { Component, inject } from '@angular/core';
import { AuthService } from '../../Core/Services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
    private readonly _AuthService = inject(AuthService);  
    private readonly _FormBuilder = inject(FormBuilder);
    private readonly _Router = inject(Router);
    step:Number = 1;

    verifyEmail:FormGroup = this._FormBuilder.group({
      email:[null, [Validators.required, Validators.email]],
    });

    verifyCode:FormGroup = this._FormBuilder.group({
      resetCode:[null, [Validators.required, Validators.pattern(/^\w{6}$/)]],
    });

    resetPassword:FormGroup = this._FormBuilder.group({
      email:[null, [Validators.required, Validators.email]],
      newPassword:[null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    });

    verifyEmailSubmit():void{
      this._AuthService.setVerifyEmail(this.verifyEmail.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.statusMsg === 'success'){
            this.step = 2;
          }
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }

    verifyCodeSubmit():void{
      this._AuthService.setVerifyCode(this.verifyCode.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.status === 'Success'){
            this.step = 3;
          }
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }

    resetPasswordSubmit():void{
      this._AuthService.setResetPassword(this.resetPassword.value).subscribe({
        next:(res)=>{
          console.log(res);
          localStorage.setItem('userToken', res.token);
          //navigate to home page
          this._Router.navigate(['/home']);
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }
}
