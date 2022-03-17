import { Component, OnInit } from '@angular/core';
import { JsonLDService } from './service/json-ld.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-jsonld';


  constructor(
    protected readonly jsonLdService: JsonLDService
  ) {}

  ngOnInit() {
    this.jsonLdService.removeStructuredData();
    this.jsonLdService.getSchema();
  }
}
