import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IEnvironment } from '../shared/environment.model';
import { ENVIRONMENT_INJECT_TOKEN } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  private apiBase = '';
  constructor(
    private http: HttpClient,
    @Inject(ENVIRONMENT_INJECT_TOKEN) private env: IEnvironment,
  ) {
    this.apiBase = this.env.backend.baseUrl;
  }

  
  public getAllProject() {
    const url = this.apiBase + `api/project?sort=updated_at&order=desc`;
    return this.http.get<any>(url);
  }

  public getProjectById(projectId) {
    const url = this.apiBase + `api/project/${projectId}`;
    return this.http.get<any>(url);
  }
}
