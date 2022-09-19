import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';

@NgModule({
  declarations: [
    AppComponent,
    GoogleMapsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCoPlUOiegF5oCemNKjGLr9PUWR6YMRXxU',
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
