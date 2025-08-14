import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CONSTANT } from '../../core/constants/contant';
@Injectable({
  providedIn: 'root'
})
export class AdminService { 
  private _http = inject(HttpClient);
  private apiAdminUrl = environment.API_BASE_URL + CONSTANT.ADMIN_RESSOURCES.ATTRIBUT_MANAGER;
  attributeManagerToProject(projectId: number, managerId: number): Observable<any> {
    const params = new HttpParams()
      .set('projectId', projectId.toString())
      .set('managerId', managerId.toString()); 
     return this._http.post(

      `${this. apiAdminUrl}/attributeManagerToProject`,
      { params }

    );

    
  }
}
