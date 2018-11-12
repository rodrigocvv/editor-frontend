import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Http } from "@angular/http";
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from "@angular/common/http";
import { SessionService } from "./session.service";


@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

    constructor(private sessionService: SessionService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log('***************************************************');
        // console.log('***************************************************');
        // console.log('***************************************************');
        // console.log('***************************************************');
        // console.log('url => '+ req.url);
        // console.log('Meu token => ' + this.sessionService.token)
        // const accessToken = localStorage.getItem('access_token');
        const accessToken = this.sessionService.token;
        if (accessToken && req.url.includes('/data')) {
            //const header = new Headers();
            //header.append('Authorization', 'Bearer ' + accessToken);
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + accessToken
                }
            });
            return next.handle(req);
        } else {
            return next.handle(req);
        }
    }
}