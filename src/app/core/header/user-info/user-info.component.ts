import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../../../user/user.services';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'stats-header-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})

export class HeaderUserInfoComponent implements OnDestroy {
  public userName: string;
  public isLoggedIn: boolean;
  private userSubscriber: Subscription;

  constructor(private User: UserService) {
    this.userSubscriber = this.User.getUser()
      .subscribe((user) => {
        this.isLoggedIn = this.User.isLoggedIn();
        if (this.isLoggedIn) {
          this.userName = user && user.name;
        }
      });
  }

  ngOnDestroy() {
    this.userSubscriber.unsubscribe();
  }
}
