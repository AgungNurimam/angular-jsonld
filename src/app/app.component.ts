import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { JsonLDService } from './service/json-ld.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-jsonld';


  constructor(
    protected readonly jsonLdService: JsonLDService,
    protected readonly platform: Platform
  ) { }

  ngOnInit() {
    this.jsonLdService.removeStructuredData();
    this.jsonLdService.getSchema();
  }

  protected async initializeApp(): Promise<void> {
    this.platform.ready().then(async () => {

      let subs: Subscription = this.jsonLdService.getSchema().subscribe(data => {
        this.jsonLdService.insertSchema(data);
      }, () => { }, () => subs.unsubscribe());
    });
  }
}
