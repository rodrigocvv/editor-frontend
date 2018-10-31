import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Http } from "@angular/http";
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from "@angular/common/http";


@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('***************************************************');
        console.log('***************************************************');
        console.log('***************************************************');
        console.log('***************************************************');
        console.log('url => '+ req.url);
        const accessToken = localStorage.getItem('access_token');
        if (accessToken && req.url.indexOf('http://localhost:3000/user/') === 0) {
            const header = new Headers();
            header.append('Authorization', 'Bearer ' + accessToken);
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return next.handle(req);
        } else {
            return next.handle(req);
        }
    }
}