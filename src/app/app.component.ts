import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {FormControl} from "@angular/forms";
import {first, Subscription} from "rxjs";
import {TranslationService} from "./translation.service";

interface TranslationLanguages {
  name: string;
  fileJson: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'ngx-translation';
  _subscription: Subscription = new Subscription();
  translationLanguages: TranslationLanguages[] = [{
    name: "Francais",
    fileJson: "fr"
  }, {
    name: "Anglais",
    fileJson: "en"
  }];
  translationCtrl: FormControl = new FormControl("fr");

  constructor(private translate: TranslateService, private translationService: TranslationService) {
  }

  ngOnInit(): void {
    this.loadTranslation();
  }

  private loadTranslation() {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang("fr")
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|fr/) ? browserLang : 'fr'); // change to get different behavior
    this.changeTranslation("fr")
    this._translationChange();
  }

  private changeTranslation(lang: string) {
    this.translate.getTranslation(lang).pipe(first()).subscribe(
      (value) => {
        this.translationService.getTranslations().pipe(first()).subscribe(
          (value) => {
            console.log(value);
            this.translate.setTranslation(lang, value[lang], true);
            this.translate.use(lang);

          }
        )
      }
    )

  }

  private _translationChange() {
    const _translationChange = this.translationCtrl.valueChanges.subscribe(
      (value) => {
        this.changeTranslation(value)
      }
    )
    this._subscription.add(_translationChange);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }


}
