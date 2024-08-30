/**
    * @description      : 
    * @author           : renau
    * @group            : 
    * @created          : 30/08/2024 - 14:34:32
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 30/08/2024
    * - Author          : renau
    * - Modification    : 
**/
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of, switchMap } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class DataService {

    private readonly currentSemaineUrl = environment.apiURL + '/api/currentSemaine'

    public username?: string
    public token?: string

    constructor(private http: HttpClient) {
    }

    public donneesJour(): Observable<Jour> {
        console.log("getting data")
        return this.http.get<Jour[]>(this.currentSemaineUrl).pipe(switchMap(jours => {
            console.log("data: ", jours[0])
            return of(jours[0]);
        }))
    }
}

export interface Jour {
    id: number
    jour: string
    proposition_termine: boolean
    proposeur: {
        id: number
        Nom: string
        Prenom: string
    }
}
