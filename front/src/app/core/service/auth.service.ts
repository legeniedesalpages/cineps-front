/**
    * @description      : 
    * @author           : renau
    * @group            : 
    * @created          : 13/12/2022 - 10:58:08
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 13/12/2022
    * - Author          : renau
    * - Modification    : 
**/
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly loginUrl = environment.apiURL + '/api/login_check'

  public username?: string
  public token?: string

  constructor(private http: HttpClient) {
  }

  public login(email: string, password: string): Observable<string> {
    return this.http
      .post<any>(this.loginUrl, { email: email, password: password })
      .pipe(switchMap(result => {
        this.username = email
        this.token = result.token
        return this.token!
      }))
  }
}
