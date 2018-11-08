import { Component, OnInit, AfterViewChecked, AfterContentChecked, ElementRef, ViewChild } from '@angular/core';
import { SocialUser } from '../../model/social-user';
import { SessionService } from '../../service/session.service';
import { AuthService } from 'angular-6-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  constructor(private session: SessionService, private socialAuthService: AuthService, private router: Router) { }

  user: SocialUser;
  contentList = [];
  currentTextIndex: number;

  isChangingTitle = false;
  isConfigEnabled = false;

  @ViewChild("titleInput") titleInput: ElementRef;

  ngOnInit() {
    this.user = this.session.getSocialUser();
    this.checkEmptyContentList();
  }

  checkEmptyContentList() {
    if (this.contentList.length === 0) {
      const content = {
        createDate: new Date(),
        text: '',
        title: 'New'
      };
      this.contentList[0] = content;
      this.currentTextIndex = 0;
    }

  }

  changeConfigState() {
    this.isConfigEnabled = !this.isConfigEnabled;
  }

  enableChangeTitle() {
    this.isChangingTitle = true;
    // this.titleInput.nativeElement.focus();
    setTimeout(() => this.titleInput.nativeElement.focus());
  }

  disableChangeTitle() {
    this.isChangingTitle = false;
  }

  selectTab(index) {
    this.currentTextIndex = index;
  }

  deleteCurrentText() {
    this.contentList.splice(this.currentTextIndex, 1);
    if (this.currentTextIndex > 0) {
      this.currentTextIndex--;
    }
    this.checkEmptyContentList();
  }

  startNewText() {
    let newIndex = this.contentList.length;
    const content = {
      createDate: new Date(),
      text: '',
      title: 'New' + newIndex
    };

    this.contentList[newIndex] = content;
    this.currentTextIndex = newIndex;
  }

  logout() {
    this.socialAuthService.signOut().then(response => {
      this.session.logout();
      this.router.navigate(['']);
    });
  }

}
