import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _http = inject(HttpClient);

  constructor() {}

  // public login(userName: string, password: string): {
  //   return this._http.post(environment.API_BASE_URL)

  // }
}
