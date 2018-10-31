import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angular-6-social-login';
import { SigninComponent } from './component/signin/signin.component';
import { SessionService } from './service/session.service';
import { UserDataComponent } from './component/user-data/user-data.component';
import { MainComponent } from './component/main/main.component';
import { HttpModule } from '@angular/http';
import { HttpTokenInterceptor } from './service/http-token-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    UserDataComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule
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
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('761402740627931')
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('706044132167-j4q7f5p4rj5bfkb8jin84bs4iolka9op.apps.googleusercontent.com')
      },
    ]
  );
  return config;
}

