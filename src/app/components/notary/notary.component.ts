import { Component, OnInit } from '@angular/core';
import { ApprovalRequest } from 'src/app/interfaces/ApprovalRequest';
import { Divorce } from 'src/app/interfaces/Divorce';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-notary',
  templateUrl: './notary.component.html',
  styleUrls: ['./notary.component.css']
})
export class NotaryComponent implements OnInit{

  divorces: Divorce[] = [];
  
  constructor(private apiService: ApiService, private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.auth.isAuthorized('NOTARY');
    this.apiService.getDivorces().subscribe({
      next: (res: any) => {
        this.divorces = res;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  approve(divorce: Divorce){
    this.submitApproval(divorce.id, divorce.notary, true);
  }

  reject(divorce: Divorce) {
    this.submitApproval(divorce.id, divorce.notary, false);
  }

  submitApproval(id: string, notary: string, decision: boolean) {
    const approvalRequest = {
      divorceId: id,
      notaryId: notary,
      approval: decision
    }
    this.apiService.approveDivorce(approvalRequest).subscribe({
      next: (res: any) => {
        console.log(res);
        let index = this.divorces.findIndex(divorce => divorce.id === id);
        this.divorces[index] = res;
      },
      error(err) {
        console.error(err);
      },
    })
  }

  

}
