import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { CONSTANT } from '../constants/contant';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class Admin {
   private _http = inject(HttpClient);
  private apiAdminrUrl =
    environment.API_BASE_URL + CONSTANT.ADMIN_RESSOURCES.ATTRIBUT_MANAGER;
  attributeManagerToProject(projectId: number , managerrId:number){
  const params = new HttpParams()
  .set('projectId',projectId.toString())
  .set('managerId',managerrId.toString());
  return this._http.post(
      `${this.apiAdminrUrl}/attributeManagerToProject`, 
      { params }
    );
}
}
