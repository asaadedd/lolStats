import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoreRoutingGuard } from './core-routing-guard.service';

const routes: Routes = [
  // { path: 'home', loadChildren: '', canLoad: [CoreRoutingGuard] },
  // { path: 'stats', loadChildren: '', canLoad: [CoreRoutingGuard] },
  // { path: 'openings', loadChildren: '', canLoad: [CoreRoutingGuard] },
  // { path: 'my-openings', loadChildren: '', canLoad: [CoreRoutingGuard] }
  { path: 'user', loadChildren: '../user/user.module#UserModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
