import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  public burgers(): Observable<any> {
    const options = {
      headers: {
        'x-rapidapi-host': 'burgers1.p.rapidapi.com',
        'x-rapidapi-key': '77cfa518e0msha0364f56a69a699p13f5acjsn7e1097b0222d'
      }
    };

    return this.http.get('https://burgers1.p.rapidapi.com/burgers', options);
  }
}
