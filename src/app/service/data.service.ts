import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { constants } from '../constants';

@Injectable()
export class DataService {

    private URL_DATA = constants.url_backend + 'data';
    // private URL_DATA = 'https://texteditor-backend.herokuapp.com/data';
    // private URL_DATA = 'http://texteditor-backend.rodrigocvv.com/data';

    constructor(private httpClient: HttpClient) { }

    public update(content): Observable<any> {
        return new Observable<any>(observer => {
            const payload = {
                "content": content
            };
            this.httpClient.post(this.URL_DATA, payload).subscribe(res => {
                observer.next(res);
                observer.complete();
            }, error => {
                console.log('Erro ao fazer update de dados => ' + JSON.stringify(error));
            });
        });
    }

    public getData(): Observable<any> {
        return new Observable<any>(observer => {
            this.httpClient.get(this.URL_DATA).subscribe(res => {
                observer.next(res);
                observer.complete();
            }, error => {
                console.log('Erro ao obter dados do usuário => ' + JSON.stringify(error));
            });
        });
    }    

}