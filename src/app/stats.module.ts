import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';

import { StatsComponent } from './stats.component';

@NgModule({
  declarations: [
    StatsComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
  ],
  bootstrap: [StatsComponent]
})
export class StatsModule { }
