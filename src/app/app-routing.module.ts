import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from 'src/app/component/main/main.component';
import { UserDataComponent } from 'src/app/component/user-data/user-data.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { FreeDocumentEntryComponent } from 'src/app/component/free-document-entry/free-document-entry.component';

const routes: Routes = [

  { path: '', component: MainComponent },
  { path: 'editor', component: UserDataComponent, canActivate: [AuthGuard] },
  { path: 'free', component: FreeDocumentEntryComponent },

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})



export class AppRoutingModule { }
