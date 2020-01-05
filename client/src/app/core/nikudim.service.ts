import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';
import { environment as env} from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NikudimService {

  constructor(
    private http: HttpClient,
  ) { }

  suggest(naked:string):Observable<string[]>{
    let url = env.api + env.v1 + env.suggest
    let params ={
      Naked:naked
    }
    return this.http.post(url, params)
                .pipe(map(res =>res['Nakeds']))
  }


  naked(naked):Observable<any>{
    let url = env.api + env.v2 + env.naked
    return this.http.post(url, naked)
  }
}
