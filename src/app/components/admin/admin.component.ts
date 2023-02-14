import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/interfaces/UserDetails';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  users: UserDetails[] = [];

  constructor(private authService: AuthenticationService, private apiService: ApiService, private router: Router) {}


  ngOnInit(): void {
    this.authService.isAuthorized("ADMIN");
    this.apiService.getUsers().subscribe(
      {
        next: (data:any) => {
        this.users = data;
      },
        error: (err) => {
          console.error(err);
        }
      }
    );
  }

  onEdit(userDetail: UserDetails){
    this.router.navigate(['/edit-user', userDetail.id])
  }

  onDelete(id: string) {
    this.apiService.deleteUser(id).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.error(err);
      }
    })
    const index = this.users.findIndex(user => user.id === id);
      if(index !== -1){
        this.users.splice(index,1);
      }
      console.log(this.users)
  }

}
