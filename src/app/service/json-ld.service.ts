import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class JsonLDService {
  static scriptType = 'application/ld+json';

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private http: HttpClient
  ) { }

  removeStructuredData(): void {
    const els: Element[] = [];
    ['structured-data', 'structured-data-org'].forEach(c => {
      els.push(...Array.from(this._document.head.getElementsByClassName(c)));
    });
    els.forEach(el => this._document.head.removeChild(el));
  }

  insertSchema(className = 'structured-data', json: any): void {
    console.log('XXX Insert Schema');
    let script: any;
    let shouldAppend = false;
    if (this._document.head.getElementsByClassName(className).length) {
      script = this._document.head.getElementsByClassName(className)[0];
    } else {
      script = this._document.createElement('script');
      shouldAppend = true;
    }
    script.setAttribute('class', className);
    script.type = JsonLDService.scriptType;
    script.text = JSON.stringify(json);
    if (shouldAppend) {
      this._document.head.appendChild(script);
    }
  }

  getSchema(): void {
    let apiUrl = 'https://agungnurimam.github.io/json-scheme/test-json.json';

    this.http.get(apiUrl, {responseType: 'text'}).subscribe(data => {
      this.insertSchema('structured-data', data);
    })
  }
}
