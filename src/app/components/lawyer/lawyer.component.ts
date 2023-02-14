import { Component, OnInit } from '@angular/core';
import { DivorceRequest } from 'src/app/interfaces/DivorceRequest';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-lawyer',
  templateUrl: './lawyer.component.html',
  styleUrls: ['./lawyer.component.css']
})
export class LawyerComponent implements OnInit{

    divorce: DivorceRequest = {
      lawyerOne: '',
      husbandOne: '',
      lawyerTwo: '',
      husbandTwo: '',
      marriageDate: ''
    }

  constructor(private apiService:ApiService, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.isAuthorized("LAWYER");
  }

  onCreate() {
    this.divorce.marriageDate = new Date(this.divorce.marriageDate).toISOString();
    this.apiService.submitDivorce(this.divorce).subscribe({
      next (res:any) {
        console.log(res);
        if(res.status === "PENDING"){
          alert("Successfully submitted");
        } 
        if(res.status === "UNSUCCESSFUL_DIVORCE"){
          alert("Unsuccessfull divorce");
        } 
      },
      error(err) {
        console.error(err);
        
      },
    })
  }

}
