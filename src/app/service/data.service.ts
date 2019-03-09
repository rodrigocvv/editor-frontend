import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class DataService {

    private URL_DATA = environment.backendUrl + 'data';

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