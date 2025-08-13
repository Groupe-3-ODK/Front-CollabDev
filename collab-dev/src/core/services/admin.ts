import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Admin {
  //   attributeManagerCoins(projectId: number, coins: number): Observable<any> {
  //   const params = new HttpParams()
  //     .set('projectId', projectId.toString())
  //     .set('coins', coins.toString());
  //   return this.http.put(
  //     `${this._apiUrl}/attributeCoinsToManager`,
  //     null, // pas de body
  //     { params }
  //   );
  // }
  // this.myService.attributeManagerCoins(123, 50.5).subscribe({
  //   next: res => console.log('Coins attribués', res),
  //   error: err => console.error('Erreur attribution coins', err)
  // });
  //------------------------------------
  // attributeManagerToProject(projectId: number, managerId: number): Observable<any> {
  //   const params = new HttpParams()
  //     .set('projectId', projectId.toString())
  //     .set('managerId', managerId.toString());
  //   return this.http.put(
  //     `${this._apiUrl}/attributeManagerToProject`,
  //     null, // pas de body
  //     { params }
  //   );
  // }
  // this.myService.attributeManagerToProject(123, 45).subscribe({
  //   next: res => console.log('Manager attribué au projet', res),
  //   error: err => console.error('Erreur attribution manager', err)
  // });
  //-----------------------------------
  // trustProject(projectId: number): Observable<any> {
  //   const params = new HttpParams().set('projectId', projectId.toString());
  //   return this.http.put(
  //     `${this._apiUrl}/trustProject`,
  //     null, // pas de body
  //     { params }
  //   );
  // }
  // this.myService.trustProject(123).subscribe({
  //   next: res => console.log('Projet validé/trusté', res),
  //   error: err => console.error('Erreur validation projet', err)
  // });
}
