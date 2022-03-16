import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

export const unipinLD = [
	{
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": "UniPin",
		"url": "https://www.unipin.com",
		"description": "Unipin Is..........",
		"sameAs": [
			"https://www.facebook.com/UniPin",
			"https://twitter.com/unipinindonesia",
			"https://www.tiktok.com/@unipin",
			"https://www.youtube.com/channel/UClINXntvfPr_44coZpObmDA"
		]
	},
	{
		"@context": "https://schema.org",
		"@type": "NewsArticle",
		"mainEntityOfPage": {
			"@type": "WebPage",
			"@id": "https://www.unipin.com/article"
		},
		"headline": "Latest from Unipin",
		"image": [
			"https://example.com/photos/1x1/photo.jpg",
			"https://example.com/photos/4x3/photo.jpg",
			"https://example.com/photos/16x9/photo.jpg"
		],
		"datePublished": "2015-02-05T08:00:00+08:00",
		"dateModified": "2015-02-05T09:20:00+08:00",
		"author": {
			"@type": "Person",
			"name": "John Doe",
			"url": "http://example.com/profile/johndoe123"
		},
		"publisher": {
			"@type": "Organization",
			"name": "Unipin",
			"logo": {
				"@type": "ImageObject",
				"url": "https://google.com/logo.jpg"
			}
		}
	}
]

@Injectable({
  providedIn: 'root'
})
export class JsonLDService {
  static scriptType = 'application/json+ld';

  constructor(@Inject(DOCUMENT) private _document: Document) { }

  removeStructuredData(): void {
    const els: Element[] = [];
    ['structured-data', 'structured-data-org'].forEach(c => {
      els.push(...Array.from(this._document.head.getElementsByClassName(c)));
    });
    els.forEach(el => this._document.head.removeChild(el));
  }

  insertSchema(className = 'structured-data'): void {
    console.log('XXX Insert Schema');
    let script;
    let shouldAppend = false;
    if (this._document.head.getElementsByClassName(className).length) {
      script = this._document.head.getElementsByClassName(className)[0];
    } else {
      script = this._document.createElement('script');
      shouldAppend = true;
    }
    // script.setAttribute('class', className);
    // script.type = JsonLDService.scriptType;
    // script.text = JSON.stringify(unipinLD);
    if (shouldAppend) {
      this._document.head.appendChild(script);
    }
  }
}
