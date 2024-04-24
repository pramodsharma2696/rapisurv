import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IEnvironment } from '../shared/environment.model';
import { ENVIRONMENT_INJECT_TOKEN } from '../shared/constants';
import { WebStorageService, EStorageTarget } from '../shared/storage.service';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private userdata;
  private apiBase = '';
  private timesheetapiBase = 'http://timesheet2.test/';

  constructor(
    private http: HttpClient,
    @Inject(ENVIRONMENT_INJECT_TOKEN) private env: IEnvironment,
    private webStorageService: WebStorageService
  ) {
    this.apiBase = this.env.backend.baseUrl;
    this.userdata = this.webStorageService.getItem('userData',
      { target: EStorageTarget.LocalStorage ? EStorageTarget.LocalStorage : EStorageTarget.SessionStorage })
  }


  public getAllProject() {
    const url = this.apiBase + `api/project?sort=updated_at&order=desc`;
    return this.http.get<any>(url);
  }

  public getProjectById(projectId) {
    const url = this.apiBase + `api/project/${projectId}`;
    return this.http.get<any>(url);
  }

  public getUsers() {
    let id = this.userdata?.organisation.id;
    const url = this.apiBase + `api/team/${id}/users`
    return this.http.get<any>(url)
  }

  public createTimesheet(timesheet) {
    const url = this.timesheetapiBase + `api/create-timesheet`;
    return this.http.post<any>(url, timesheet)
  }

  public updateTimesheet(timesheet) {
    const url = this.timesheetapiBase + `api/update-timesheet`;
    return this.http.post<any>(url, timesheet)
  }
  public getTimesheets() {
    const url = this.timesheetapiBase + `api/all-timesheet`
    return this.http.get<any>(url)
  }

  public getTimesheetById(timesheetId) {
    const url = this.timesheetapiBase + `api/timesheet-details/${timesheetId}`;
    return this.http.get<any>(url);
  }



}
