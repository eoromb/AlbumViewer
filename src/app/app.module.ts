import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ToasterModule } from 'angular2-toaster';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { reducers, metaReducers } from './store/reducers';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import {toasterConfig} from './toaster.config';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    ToasterModule.forRoot(),
    SharedModule
  ],
  providers: [{provide: 'TOASTER_CONFIG', useValue: toasterConfig}],
  bootstrap: [AppComponent]
})
export class AppModule { }
