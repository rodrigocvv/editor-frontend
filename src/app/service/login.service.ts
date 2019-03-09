import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {

    private URL_LOGIN = environment.backendUrl + 'auth/login';

    constructor(private httpClient: HttpClient) { }

    public getToken(googleToken): Observable<any> {
        return new Observable<any>(observer => {
            const loginData = {
                "token": googleToken,
                "appId": "1"
            };
            this.httpClient.post(this.URL_LOGIN, loginData).subscribe(res => {
                observer.next(res);
                observer.complete();
            }, error => {
                console.log('Erro ao obter o Token de autenticacao com servidor => ' + JSON.stringify(error));
            });
        });
    }

}