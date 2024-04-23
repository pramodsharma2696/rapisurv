import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IEnvironment } from '../shared/environment.model';
import { ENVIRONMENT_INJECT_TOKEN } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  private apiBase = '';
  private timesheetapiBase = 'http://timesheet2.test/';
  private authToken = '3|EZKUrrVVw2rTYo3p0wSyOkMTYXMf0P3lYBTlAd6bbc40d9e3'
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

  public createTimesheet(timesheet) {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${this.authToken}`
    // });

    const url = this.timesheetapiBase + `api/create-timesheet`;
    return this.http.post<any>(url, timesheet)
  }

  public getTimesheets() {
    console.log("Service timesheet")
    const url = this.timesheetapiBase + `api/all-timesheet`
    return this.http.get<any>(url)
  }
}
