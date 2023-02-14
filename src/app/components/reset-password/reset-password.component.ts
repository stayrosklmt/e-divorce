import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  
  passwordsNotMatch: boolean = false;
  username: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  newPasswordCheck: string = '';

  constructor(private auth:AuthenticationService, private router:Router) {}

  onReset(){
    if(this.newPassword != this.newPasswordCheck){
      this.passwordsNotMatch = true;
    }else {
      this.auth.resetPassword(this.username, this.currentPassword, this.newPassword).subscribe({
        next: (res: any) => {
          console.log(res);
          this.router.navigate(['/']);
        },
        error: (err: any) => {
          console.error(err);
        } 
      });
    }
  }

}
