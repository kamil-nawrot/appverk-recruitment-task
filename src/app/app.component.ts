import { UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslatePipe, UpperCasePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  translate = inject(TranslateService);

  ngOnInit(): void {
    this.translate.addLangs(['pl', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  onLanguageSwitch(lang: string): void {
    this.translate.use(lang);
  }
}
