import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class JoinProject {
  readonly API_URL = "http://localhost:8080"
  readonly ENDPOINT_JOIN_PROJECT = "/projects"

  constructor(private httpClient : HttpClient){
  }
 
}
