import { NgModule } from '@angular/core';
import { CoreRoutingModule } from './core-routing.module';
import { UserModule } from '../user/user.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header/header.component';
import { HeaderNavBarComponent } from './header/nav-bar/nav-bar.component';
import { HeaderLogoComponent } from './header/logo/logo.component';
import { HeaderUserInfoComponent } from './header/user-info/user-info.component';
import { ChangeLanguageComponent } from './header/change-language/change-language.component';

import { DataModelsService } from './data-model/data-model.service';
import { DataCompressorService } from './data-model/data-compressor.service';
import { DataArrayBufferService } from './data-model/data-array-buffer.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  imports: [
    CoreRoutingModule,
    UserModule,
    HttpClientModule,
    CommonModule,
    MatSelectModule,
    NoopAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    HeaderComponent,
    HeaderNavBarComponent,
    HeaderLogoComponent,
    HeaderUserInfoComponent,
    ChangeLanguageComponent
  ],
  exports: [
    HeaderComponent,
    RouterModule,
    TranslateModule,
    HttpClientModule
  ],
  providers: [
    DataModelsService,
    DataCompressorService,
    DataArrayBufferService
  ]
})
export class CoreModule { }
