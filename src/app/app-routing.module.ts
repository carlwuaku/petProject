import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddPetComponent } from './petStore/add-pet/add-pet.component';
import { ListPetsComponent } from './petStore/list-pets/list-pets.component';

const routes: Routes = [
  { path: '', component: ListPetsComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'listpets', component: ListPetsComponent, canActivate: [AuthGuardService] },
  { path: 'listpets/:status', component: ListPetsComponent, canActivate: [AuthGuardService] },
  { path: 'addpet', component: AddPetComponent, canActivate: [AuthGuardService] },
  { path: '**', component: PageNotFoundComponent }
  
];
export default routes;
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

