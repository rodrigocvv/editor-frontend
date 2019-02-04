import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../service/session.service';
import { AuthService } from 'angular-6-social-login';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [LoginService]
})
export class MainComponent implements OnInit {

  loading = false;

  constructor(public session: SessionService, private socialAuthService: AuthService,
    private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.socialAuthService.authState.subscribe((user) => {
      // console.log('Dados do usuário => ' + JSON.stringify(user));
      if (user) {
        this.doApplicationLogin(user);
      } else {
        this.loading = false;
      }
    }, error => {
      this.loading = false;
    });
  }

  doApplicationLogin(user) {
    this.loginService.getToken(user.idToken).subscribe(resp => {
      // console.log('Resposta do servidor => ' + JSON.stringify(resp));
      if (resp) {
        this.session.addSocialUser(user);
        this.session.token = resp.token;
        this.router.navigate(['editor']);
        this.loading = false;
      } else {
        this.loading = false;
      }
    }, error => {
      this.loading = false;
    });
  }

}

