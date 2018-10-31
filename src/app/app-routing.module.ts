import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from 'src/app/component/main/main.component';
import { UserDataComponent } from 'src/app/component/user-data/user-data.component';
import { AuthGuard } from 'src/app/auth/auth.guard';

const routes: Routes = [

  { path: '', component: MainComponent },
  { path: 'myArea', component: UserDataComponent, canActivate: [AuthGuard] }

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})



export class AppRoutingModule { }
