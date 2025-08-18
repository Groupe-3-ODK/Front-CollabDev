import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IApiResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root',
})
export class Task {
  private _http = inject(HttpClient);
  private _apiUrl = environment.API_BASE_URL;

  createTasks(tasksDTO: any, managerId?: number): Observable<IApiResponse> {
    let params = new HttpParams();
    if (managerId !== undefined && managerId !== null) {
      params = params.set('managerId', managerId.toString());
    }
    return this._http.post<IApiResponse>(
      `${this._apiUrl}/tasks/create-Tasks`,
      tasksDTO,
      {
        params,
      }
    );
  }
  // const tasksDTO = {
  //   projectId: 123,
  //   tasks: [
  //     { title: 'Tâche 1', description: 'Description 1' },
  //     { title: 'Tâche 2', description: 'Description 2' }
  //   ]
  // };
  // this.myService.createTasks(5, tasksDTO).subscribe({
  //   next: res => console.log('Tâches créées', res),
  //   error: err => console.error('Erreur création tâches', err)
  // });
  //-------------------------------------------------------
  assignTasksToProfil(assignDTO: any, managerId?: number): Observable<any> {
    let params = new HttpParams();
    if (managerId !== undefined && managerId !== null) {
      params = params.set('managerId', managerId.toString());
    }
    return this._http.post(`${this._apiUrl}/tasks/assignTask`, assignDTO, {
      params,
    });
  }
  // const assignDTO = {
  //   projectId: 123,
  //   profilIdCible: 45,
  //   taskIds: [1, 2, 3]
  // };
  // this.myService.assignTasksToProfil(5, assignDTO).subscribe({
  //   next: res => console.log('Tâches assignées', res),
  //   error: err => console.error('Erreur assignation tâches', err)
  // });
  //-----------------------------------------------
  submitTask(taskId: number, contributorId: number): Observable<any> {
    const params = new HttpParams().set(
      'contributorId',
      contributorId.toString()
    );
    return this._http.put(
      `${this._apiUrl}/tasks/${taskId}/submitTask`,
      null, // pas de body
      { params }
    );
  }
  // this.myService.submitTask(12, 5).subscribe({
  //   next: res => console.log('Tâche soumise', res),
  //   error: err => console.error('Erreur soumission tâche', err)
  // });
  //-----------------------------------------------
  assignPoints(taskId: number, managerId: number): Observable<string> {
    const params = new HttpParams()
      .set('taskId', taskId.toString())
      .set('managerId', managerId.toString());
    return this._http.post<string>(
      `${this._apiUrl}/managerInfo/validateTask`,
      null, // pas de body
      { params }
    );
  }
  // Attribution des points
  // this.myService.assignPoints(10, 5).subscribe({
  //   next: res => console.log(res),  // "Points attribués avec succès"
  //   error: err => console.error(err)
  // });
}
