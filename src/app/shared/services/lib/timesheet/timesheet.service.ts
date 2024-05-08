import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IEnvironment } from '../shared/environment.model';
import { ENVIRONMENT_INJECT_TOKEN } from '../shared/constants';
import { WebStorageService, EStorageTarget } from '../shared/storage.service';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }),
}

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private userdata;
  private apiBase = '';
  private timesheetapiBase = 'http://48.216.210.209/';

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

  public getTimesheetQR(projectId) {
    const url = this.timesheetapiBase + `api/generate-qr/${projectId}`;
    return this.http.get<any>(url);
  }

  public getTimesheetId() {
    const url = this.timesheetapiBase + `api/generate-timesheet-id`;
    return this.http.get<any>(url);

  }

  public getWorkingDays(startDate, endDate) {
    let url = this.apiBase + 'api/work-days' + '?start_date=' + startDate + "&end_date=" + endDate
    return this.http.get(url, httpOptions)
  }

  public createLocalWorker(localworkers) {
    const url = this.timesheetapiBase + `api/add-local-worker`;
    return this.http.post<any>(url, localworkers)
  }

  public updateLocalWorker(worker) {
    const url = this.timesheetapiBase + `api/update-worker`;
    return this.http.post<any>(url, worker)
  }

  public updateLocalWorkerByFile(file, timesheetid) {

    const formData = new FormData();
    formData.append('file', file);
    formData.append('timesheet_id', timesheetid.toString());
    const url = this.timesheetapiBase + `api/add-local-worker-csv`;
    return this.http.post<any>(url, formData)
  }
  public getTimesheetLocalWorker(timesheetid) {
    const url = this.timesheetapiBase + `api/worker/${timesheetid}`;
    return this.http.get<any>(url);
  }

  public getLocalWorkerAttendanceByDate(timesheetid, date) {
    const url = this.timesheetapiBase + `api/worker/${timesheetid}/${date}`;
    return this.http.get<any>(url);
  }

  public createWorkerAttendance(workerattendance) {
    const url = this.timesheetapiBase + `api/record-attendance`;
    return this.http.post<any>(url, workerattendance)
  }

  public createWorkerAssignTaskHour(workerassignedHours) {
    const url = this.timesheetapiBase + `api/assign-task-hours`;
    return this.http.post<any>(url, workerassignedHours)
  }

  public approveWorkerAttendance(attendance_id) {
    let data = {
      attendance_id: attendance_id,
      approve: '1'
    }
    const url = this.timesheetapiBase + `api/approve-attendance`;
    return this.http.post<any>(url, data)
  }

  public rejectWorkerAttendance(attendance_id) {
    let data = {
      attendance_id: attendance_id,
      approve: '0'
    }
    const url = this.timesheetapiBase + `api/approve-attendance`;
    return this.http.post<any>(url, data)
  }

  public approveAllWorkerAttendance(timesheet_id, date) {
    let data = {
      timesheet_id: timesheet_id,
      date: date,
      approve: '1'
    }
    const url = this.timesheetapiBase + `api/approve-all-attendance`;
    return this.http.post<any>(url, data)
  }

  public rejectAllWorkerAttendance(timesheet_id, date) {
    let data = {
      timesheet_id: timesheet_id,
      date: date,
      approve: '0'
    }
    const url = this.timesheetapiBase + `api/approve-all-attendance`;
    return this.http.post<any>(url, data)
  }

  public getTimesheetWorkerSummary(timesheetid) {
    const url = this.timesheetapiBase + `api/get-summary-data/${timesheetid}`;
    return this.http.get<any>(url);
  }

  public getNumberOfWorkerByTimesheetId(timesheetid) {
    const url = this.timesheetapiBase + `api/get-total-worker/${timesheetid}`;
    return this.http.get<any>(url);
  }

  public getAttendaceById(timesheetid, worker_id, start_date, end_date) {
    const url = this.timesheetapiBase + `api/get-in-out-attendance-data/${timesheetid}/${worker_id}/${start_date}/${end_date}`;
    return this.http.get<any>(url);
  }

  public getAllWorkerAttendance(timesheetid, start_date, end_date): Observable<any> {
    // Fetch all workers
    return this.getTimesheetLocalWorker(timesheetid).pipe(
      // After getting workers, fetch attendance for each worker
      switchMap(workers => {
        // Create an array of observables to fetch attendance for each worker
        const attendanceRequests = workers.data.map(worker => {
          console.log('worker servie')
          console.log(worker)
          return this.getAttendaceById(timesheetid, worker.id, start_date, end_date).pipe(
            map(attendance => ({ worker, attendance }))
          );
        });
        // Combine all observables into a single observable
        return forkJoin(attendanceRequests);
      })
    );
  }

}
