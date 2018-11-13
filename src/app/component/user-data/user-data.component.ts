import { Component, OnInit, AfterViewChecked, AfterContentChecked, ElementRef, ViewChild } from '@angular/core';
import { SocialUser } from '../../model/social-user';
import { SessionService } from '../../service/session.service';
import { AuthService } from 'angular-6-social-login';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
  providers: [DataService]
})
export class UserDataComponent implements OnInit {

  constructor(private session: SessionService, private socialAuthService: AuthService, private router: Router, private dataService: DataService) { }

  user: SocialUser;
  contentList = [];
  currentTextIndex = 0;
  contentListDB = [];

  isChangingTitle = false;
  isConfigEnabled = false;

  loading = false;

  @ViewChild("titleInput") titleInput: ElementRef;

  ngOnInit() {
    this.user = this.session.getSocialUser();
    // this.checkEmptyContentList();
    this.getData();
  }

  getData(){
    this.loading = true;
    this.dataService.getData().subscribe(dataDB => {
      // console.log('Retorno do get data => ' + JSON.stringify(dataDB));
      if (dataDB){
        this.contentListDB = dataDB;
        this.contentList = JSON.parse(JSON.stringify(dataDB));
      }
      this.checkEmptyContentList();
      this.loading = false;
    });
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

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.disableChangeTitle();
      // rest of your code
    }
  }

  private saveContent() {
    this.dataService.update(this.contentList).subscribe(response => {
      //console.log('Retorno do método salvar => ' + JSON.stringify(response));
      this.contentListDB = response.slice();
    });
  }

  public isSaved(){
    let saved = true;

    this.contentList.forEach( (content, index) => {
      if (!this.contentListDB[index] || content.text !== this.contentListDB[index].text || content.title !== this.contentListDB[index].title){
        saved = false;
      }
    });
    return saved;

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
    if (!this.isSaved()){
      this.saveContent();
    }
  }

  deleteCurrentText() {
    this.contentList.splice(this.currentTextIndex, 1);
    if (this.currentTextIndex > 0) {
      this.currentTextIndex--;
    }
    this.checkEmptyContentList();
    this.saveContent();
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
