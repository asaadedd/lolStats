import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { USER_PROFILES, Tab } from './user-profiles.constants';

export interface UserInfo {
  name: string;
  type: string;
}

@Injectable()
export class UserService {
  private user: UserInfo;
  private onUserChangeSubscriber: Array<Subscriber<UserInfo>> = [];

  constructor(private Http: HttpClient) {}

  public getUser(): Observable<any> {
    return Observable.create((subscriber: Subscriber<any>) => {
      const indexOfSubscriber = this.onUserChangeSubscriber.push(subscriber);

      subscriber.next(this.user);

      return () => {
        this.onUserChangeSubscriber.splice(indexOfSubscriber - 1, 1);
      };
    });
  }

  public getTabs(): Array<Tab> {
    return this.user && this.user.type ?
      USER_PROFILES[this.user.type].tabs :
      USER_PROFILES.no_user.tabs;
  }

  public isLoggedIn() {
    return !!this.user;
  }
}
