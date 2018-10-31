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

  constructor(private session: SessionService, private socialAuthService: AuthService,
    private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      console.log('Dados do usuário => ' + JSON.stringify(user));
      if (user) {
        this.session.addSocialUser(user);
        this.router.navigate(['myArea']);
      }
    });
  }

}

