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
  contentList = [];

  ngOnInit() {
    this.user = this.session.getSocialUser();
    if (this.contentList.length === 0){
      const content = {
        createDate: new Date(),
        text: ''
      };
      this.contentList[0] = content;
    }
  }

  logout() {
    this.socialAuthService.signOut();
    this.session.logout();
  }

}
