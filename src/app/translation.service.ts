import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor() { }

  getTranslations():Observable<any>{
    return of({
        "en":{
          "itWork":"it work test"
        },
      "fr":{
        "itWork":"ça marche"
      }
      }
    )
  }
}
