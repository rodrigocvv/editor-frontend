import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from 'angular-6-social-login';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { FreeDocumentEntryComponent } from './component/free-document-entry/free-document-entry.component';
import { LoaderComponent } from './component/loader/loader.component';
import { MainComponent } from './component/main/main.component';
import { SigninComponent } from './component/signin/signin.component';
import { UserDataComponent } from './component/user-data/user-data.component';
import { HttpTokenInterceptor } from './service/http-token-interceptor';
import { SessionService } from './service/session.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { FreeDocumentDetailComponent } from './component/free-document-detail/free-document-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    UserDataComponent,
    MainComponent,
    LoaderComponent,
    FreeDocumentEntryComponent,
    FreeDocumentDetailComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs,
  }, SessionService, HttpTokenInterceptor, AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpTokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('747275275230-utucjrvi7p39f836pfvk3r6o6uuefi1f.apps.googleusercontent.com')
      },
    ]
  );
  return config;
}

