import { Component, OnInit } from '@angular/core';
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular-6-social-login';
import { SessionService } from '../../service/session.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})


export class SigninComponent { // implements OnInit {

    constructor(private socialAuthService: AuthService, private session: SessionService) { }

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
                this.session.addSocialUser(userData);
            }, error => {
                console.log('Erro => ' + error);
            }
        );
    }

}
