import { Component, OnInit } from '@angular/core';
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular-6-social-login';
import { SessionService } from '../../service/session.service';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})


export class SigninComponent { // implements OnInit {

    constructor(private socialAuthService: AuthService, private session: SessionService, private loginService: LoginService, private router: Router) { }

    public socialSignIn(socialPlatform: string) {
        let socialPlatformProvider;
        if (socialPlatform === 'google') {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }
        /*
        if (socialPlatform === 'facebook') {
            socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        } else if (socialPlatform === 'google') {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        } */
        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData) => {
                // this.session.addSocialUser(userData);
                this.doApplicationLogin(userData);
            }, error => {
                console.log('Erro => ' + error);
            }
        );
    }


    doApplicationLogin(user) {
        this.loginService.getTokien(user.idToken).subscribe(resp => {
          // console.log('Resposta do servidor => ' + JSON.stringify(resp));
          if (resp) {
            this.session.addSocialUser(user);
            this.session.token = resp.token;
            this.router.navigate(['editor']);
          }
        });
      }

}
