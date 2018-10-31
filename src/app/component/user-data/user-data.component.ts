import { Component, OnInit, AfterViewChecked, AfterContentChecked } from '@angular/core';
import { SocialUser } from '../../model/social-user';
import { SessionService } from '../../service/session.service';
import { AuthService } from 'angular-6-social-login';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  constructor(private session: SessionService, private socialAuthService: AuthService) { }

  user: SocialUser;

  ngOnInit() {
    this.user = this.session.getSocialUser();
  }

  logout() {
    this.socialAuthService.signOut();
    this.session.logout();
  }

}
