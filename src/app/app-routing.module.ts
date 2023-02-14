import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AdminComponent } from './components/admin/admin.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LawyerComponent } from './components/lawyer/lawyer.component';
import { LoginComponent } from './components/login/login.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { NotaryComponent } from './components/notary/notary.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'lawyer', component: LawyerComponent},
  {path: 'notary', component: NotaryComponent},
  {path: 'user', component: UserComponent},
  {path: 'not-authorized', component: NotAuthorizedComponent},
  {path: 'edit-user/:id', component: EditUserComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'add-user', component: AddUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
