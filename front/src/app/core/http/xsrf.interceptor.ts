/**
    * @description      : 
    * @author           : renau
    * @group            : 
    * @created          : 18/12/2022 - 03:23:31
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/12/2022
    * - Author          : renau
    * - Modification    : 
**/
import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { AuthService } from '../service/auth.service'

@Injectable({ providedIn: 'root' })
export class HttpXSRFInterceptor implements HttpInterceptor {

    constructor(private router: Router, private snackBar: MatSnackBar, private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token = this.authService.token
        if (token !== null && !req.headers.has('Authorization')) {
            req = req.clone({
                withCredentials: true,
                headers: new HttpHeaders({
                    Accept: 'application/json',
                }).append('Authorization', 'bearer ' + token!)
            })
        } else {
            req = req.clone({
                withCredentials: true,
                headers: new HttpHeaders({
                    Accept: 'application/json',
                })
            })
        }

        return next.handle(req).pipe(catchError(err => {

            // redirect to login page if not authenticated (401) and if is not a authentication page
            if (err.status == 401 && !req.url.includes('/api/login_check')) {
                console.warn("No more authenticated, redirect to login page")
                this.router.navigate(['/login'])
            }

            // show error if internal server error
            if (err.status == 500) {
                this.snackBar.open("Erreur: " + err.error.message, 'Fermer', {
                    duration: 60000
                })
            }

            return throwError(() => new Error(err.error.message))
        }))

    }
}