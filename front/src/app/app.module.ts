/**
    * @description      : 
    * @author           : renau
    * @group            : 
    * @created          : 13/12/2022 - 00:10:54
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 13/12/2022
    * - Author          : renau
    * - Modification    : 
**/

import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpXSRFInterceptor } from './core/http/xsrf.interceptor';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({
  declarations: [
      AppComponent,
    ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,

    // PWA
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: !isDevMode(), registrationStrategy: 'registerWhenStable:30000' }),
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpXSRFInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi())
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}