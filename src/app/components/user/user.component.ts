import { Component, OnInit } from '@angular/core';
import { AcceptDivorce } from 'src/app/interfaces/AcceptDivorce';
import { Divorce } from 'src/app/interfaces/Divorce';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  
  divorces: Divorce [] = [];

  constructor(private apiService: ApiService, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.isAuthorized('USER');
    this.apiService.getUserDivorce().subscribe({
      next: (res: any) => {
        console.log(res);
        this.divorces = res;
      },
      error(err) {
        console.error(err);
        
      }
    });
  }

  signDivorce(divorce: Divorce, acceptDivorce: boolean) {
    const temp: any = localStorage.getItem("user");
    const username = JSON.parse(temp).username;
    
    let husband = username == divorce.husbandOneUsername;

    let answer: AcceptDivorce = {
      id: divorce.id,
      husbandOne: husband,
      accept: acceptDivorce
    }

    this.apiService.signDivorce(answer).subscribe({
      next: (res: any) => {
        console.log(res);
        let index = this.divorces.findIndex(divorce => divorce.id === answer.id);
        this.divorces[index] = res;
      },
      error(err) {
        console.error(err);
        
      },
    })
  }
}
