import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocialUser } from '../model/social-user';

@Injectable()
export class SessionService {

    listUser: SocialUser[];

    public addSocialUser(user: SocialUser): void {
        if (!this.listUser) {
            this.listUser = [];
        }
        if (user) {
            this.listUser[this.listUser.length] = user;
        }
    }

    public getSocialUser() {
        let user: SocialUser;
        if (this.listUser && this.listUser.length > 0) {
            user = this.listUser[0];
        }
        return user;
    }

    public isUserLogged(): boolean {
        let logged = false;
        if (this.listUser && this.listUser.length > 0) {
            logged = true;
        }
        return logged;
    }

    public logout(): void {
        this.listUser = null;
    }


}
