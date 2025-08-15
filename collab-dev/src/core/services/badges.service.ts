import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BadgesService {
  private _apiUrl = environment.API_BASE_URL;

  private _http = inject(HttpClient);

  createBadge(badge: any): Observable<any> {
    return this._http.post(`${this._apiUrl}/badges`, badge);
  }
  // const newBadge = {
  //   name: 'Expert',
  //   description: 'Badge pour experts',
  //   // autres propriétés selon ta classe Badge
  // };
  // this.myService.createBadge(newBadge).subscribe({
  //   next: res => console.log('Badge créé', res),
  //   error: err => console.error('Erreur création badge', err)
  // });
}
