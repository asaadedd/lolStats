import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { UserService } from '../user/user.services';

@Injectable()
export class CoreRoutingGuard implements CanLoad {
  constructor(private User: UserService) {}

  canLoad(activeRoute: Route): boolean {
    return !!this.User.getTabs()
      .find(route => route.path === activeRoute.path);
  }
}
