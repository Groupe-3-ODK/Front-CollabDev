import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { taskI } from '../interfaces/projectI';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _http = inject(HttpClient);
  private _apiUrl = environment.API_BASE_URL;


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
  assignTasksToProfil(managerId: number, assignDTO: any): Observable<any> {
    const params = new HttpParams().set('managerId', managerId.toString());
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

getProjectMembersWithPseudos(projectId: number): Observable<{id: number, pseudo: string}[]> {
  return this._http.get<{id: number, pseudo: string}[]>(
    `${this._apiUrl}/projects/${projectId}/members-with-pseudos`
  );
}

createTask(managerId: number, taskData: taskI): Observable<{id: number}> {
  return this._http.post<{id: number}>(
    `${this._apiUrl}/tasks/create-Tasks?managerId=${managerId}`,
    taskData
  );
}

assignTask(taskId: number, profilId: number): Observable<any> {
  return this._http.post(
    `${this._apiUrl}/tasks/${taskId}/assign/${profilId}`,
    {}
  );
}


  // Attribution des points
  // this.myService.assignPoints(10, 5).subscribe({
  //   next: res => console.log(res),  // "Points attribués avec succès"
  //   error: err => console.error(err)
  // });
}
