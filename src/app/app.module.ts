import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { WebViewerComponent } from './webviewer/webviewer.component';
import { HttpClientModule } from '@angular/common/http';
import { UploadModule } from '@progress/kendo-angular-upload';
import { ApiService } from './service/ApiService';

@NgModule({
  declarations: [AppComponent, WebViewerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputsModule,
    BrowserAnimationsModule,
    GridModule,
    LayoutModule,
    HttpClientModule,
    UploadModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
