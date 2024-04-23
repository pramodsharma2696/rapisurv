import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

import { STORAGE_KEY_TOKEN, STORAGE_KEY_USER, STORAGE_KEY_PERMISSIONSERIAL, STORAGE_KEY_USERNAME, STORAGE_KEY_CRUDPERMISSIONS, STORAGE_KEY_VIEWPERMISSIONS, ENVIRONMENT_INJECT_TOKEN } from './constants';
import { WebStorageService, EStorageTarget } from './storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private storageService: WebStorageService,) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.storageService.getItem(STORAGE_KEY_TOKEN, {
      target: EStorageTarget.LocalStorage,
    });


    // Notes: Here we need to use to different api's 
    // after completion of work uncomment below lines and remove if else condition

    // const authRequest = req.clone({
    //   headers: req.headers.set("Authorization", "Bearer " + authToken)
    // });
    // return next.handle(authRequest);

    if (req.url.includes('http://timesheet2.test/')) {
      const authRequest = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + '3|EZKUrrVVw2rTYo3p0wSyOkMTYXMf0P3lYBTlAd6bbc40d9e3')
      });
      return next.handle(authRequest);
    } else {
      const authRequest = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + authToken)
      });
      return next.handle(authRequest);
    }

  }
}
