import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-rounting.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

import { UserService } from './user.services';

@NgModule({
  imports: [
    UserRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
  ],
  exports: [
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
