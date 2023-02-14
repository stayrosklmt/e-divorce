import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  logIn!: boolean;

  constructor(private router: Router, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.isLogIn$.subscribe( (value) => {
      this.logIn = value;
    });
  }

  onLogOut() {
    localStorage.removeItem("user");
    this.authService.setLogIn(false);
    this.router.navigate(['/'])
  }

  onLogIn() {
    this.router.navigate(['/login'])
  }
}
