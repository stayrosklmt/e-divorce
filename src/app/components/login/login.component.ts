import { BootstrapOptions, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  username = '';
  password = '';
  wrongCredentials: boolean = false;
  
  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem("user")
    if(user != null) {
      this.router.navigate([`/${JSON.parse(user).role.toLowerCase()}`])
    }
  }

  onSignIn() {
    const credentials = {
      username: this.username,
      password: this.password
    }

    this.authService.login(credentials).subscribe(
      {
        next: (respone: any)  => {
          localStorage.setItem("user", JSON.stringify(respone))
          this.authService.setLogIn(true);
          this.router.navigate([`/${respone.role.toLowerCase()}`])
        },
        error: (err) => {
          this.wrongCredentials = true;
          console.error(err);
        }
      }
    )
  }
}
