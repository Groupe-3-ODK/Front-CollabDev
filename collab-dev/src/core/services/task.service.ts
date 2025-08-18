import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskService {

  getDeveloperCoins(userId: number) {
    const baseUrl = environment.API_BASE_URL.endsWith('/')
      ? environment.API_BASE_URL.slice(0, -1)
      : environment.API_BASE_URL;
    return this.http.get<any>(`${baseUrl}/profil/${userId}/developerCoins`);
  }

  getDesignerCoins(userId: number) {
    const baseUrl = environment.API_BASE_URL.endsWith('/')
      ? environment.API_BASE_URL.slice(0, -1)
      : environment.API_BASE_URL;
    return this.http.get<any>(`${baseUrl}/profil/${userId}/designerCoins`);
  }

  getManagerCoins(userId: number) {
    const baseUrl = environment.API_BASE_URL.endsWith('/')
      ? environment.API_BASE_URL.slice(0, -1)
      : environment.API_BASE_URL;
    return this.http.get<any>(`${baseUrl}/profil/${userId}/managerCoins`);
  }

  getTotalCoins(userId: number) {
    const baseUrl = environment.API_BASE_URL.endsWith('/')
      ? environment.API_BASE_URL.slice(0, -1)
      : environment.API_BASE_URL;
    return this.http.get<any>(`${baseUrl}/profil/${userId}/totalCoins`);
  }
  private apiUrl = environment.API_BASE_URL + 'tasks';

  constructor(private http: HttpClient) {}

  updateTaskStatus(taskId: number, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${taskId}/status`, { status });
  }
}
