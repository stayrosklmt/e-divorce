import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserDetails } from 'src/app/interfaces/UserDetails';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{

  id: string = '';
  user!: UserDetails;

  firstname!: string;
  lastname!: string;
  username!: string;
  socialSecurityNumber!: string;
  taxIdentificationNumber!: string;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router:Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.id = id;
      this.apiService.getUser(id).subscribe(
        {
          next: (data: any) => {
            this.user = data;
            this.firstname = this.user.firstname;
            this.lastname = this.user.lastname;
            this.username = this.user.username;
            this.socialSecurityNumber = this.user.socialSecurityNumber;
            this.taxIdentificationNumber = this.user.taxIdentificationNumber;
          },
          error: (err: any) => {
            console.error(err);
          }
          
        }
      )
    }
    else {
      console.error("There is no user selected to edit")
    }
    
  }

  onSave() {
    const data = {
      "firstname": this.firstname,
      "lastname": this.lastname,
      "username": this.username,
      "socialSecurityNumber": this.socialSecurityNumber,
      "taxIdentificationNumber": this.taxIdentificationNumber
    }
    console.log(data)
    this.apiService.updateUser(this.id, data).subscribe({
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
