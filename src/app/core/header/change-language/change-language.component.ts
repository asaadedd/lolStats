import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'stats-header-change-language',
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.css']
})

export class ChangeLanguageComponent {
  public languages = [
    {
      name: 'en',
      imageUrl: 'assets/images/english.png',
      translatePath: 'header.language.fields.english'
    },
    {
      name: 'ro',
      imageUrl: 'assets/images/romanian.png',
      translatePath: 'header.language.fields.romanian'
    }
  ];
  constructor(private translate: TranslateService) {}

  public onOptionChanged(language) {
    this.translate.use(language);
  }
}
