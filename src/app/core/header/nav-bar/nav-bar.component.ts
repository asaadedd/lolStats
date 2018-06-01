import { Component } from '@angular/core';
import { Tab } from '../../../user/user-profiles.constants';
import { UserService } from '../../../user/user.services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'stats-header-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class HeaderNavBarComponent {
  public headers: Observable<Array<Tab>>;

  constructor(private User: UserService) {
    this.headers = this.User.getUser()
      .map(() => this.User.getTabs());
  }
}
