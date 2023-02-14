import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserRequest } from 'src/app/interfaces/CreateUserRequest';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  user: CreateUserRequest = {
    firstname: '' ,
    lastname: '' ,
    username: '' ,
    socialSecurityNumber: '' ,
    taxIdentificationNumber: '' ,
    role: '' ,
    password: ''
  }
  
  roles: any[] = ['USER','LAWYER','NOTARY','ADMIN'];

  selectedRole = 'USER';

  constructor(private apiService: ApiService, private router:Router) {}

  onCreate() {
    this.user.role = this.selectedRole;
    this.apiService.createUser(this.user).subscribe({
      next: (res: any) => {
        console.log(res);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        console.error(err);
      }
    })
  }
}
