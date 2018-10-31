import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Http } from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class LoginService {

    private URL_BACKEND = 'http://localhost:3000/';

    constructor(private http: Http, private httpClient: HttpClient) { }

    public doLogin(): Observable<any> {
        return new Observable<any>(observer => {
            const url = this.URL_BACKEND + 'auth/login';
            const data = {
                'email': '123',
                'password': '123'
            };
            this.http.post(url, data).subscribe(res => {
                if (res.json().token) {
                    localStorage.setItem('access_token', res.json().token);
                    console.log('Token recebido => ' + res.json().token);
                }
                observer.next(true);
                observer.complete();
            });
        });
    }

    public getUsers(): Observable<any> {
        console.log('Meu token => ' + localStorage.getItem('access_token'));
        return new Observable<any>(observer => {
            const url = this.URL_BACKEND + 'user/profile';
            this.httpClient.get(url).subscribe(res => {
                console.log('Resposta => ' + JSON.stringify(res));
                observer.next(true);
                observer.complete();
            });
        });
    }

    public doNovoLogin(token, provider){
        return new Observable<any>(observer => {
            const url = this.URL_BACKEND + 'auth/loginGoogle';
            const data = {
                token: token,
                provider: provider
            };
            const cabe = new HttpHeaders();
            cabe.append('Access_token', token);
            this.httpClient.get(url, {
                headers: cabe
            }).subscribe(res => {

                console.log('Resposta => ' + JSON.stringify(res));
                observer.next(true);
                observer.complete();
            });
            
            /*this.httpClient.post(url, data).subscribe(res => {
                console.log('Resposta => ' + JSON.stringify(res));
                observer.next(true);
                observer.complete();
            });
            */
        });
    }

}