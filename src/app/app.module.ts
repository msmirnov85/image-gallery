import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { GridViewComponent } from './components/grid-view/grid-view.component';
import { ImageViewComponent } from './components/image-view/image-view.component';
import { GridViewItemComponent } from './components/grid-view/grid-view-item/grid-view-item.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { PaginationComponent } from './components/grid-view/pagination/pagination.component';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';

@NgModule({
  declarations: [
    AppComponent,
    GridViewComponent,
    ImageViewComponent,
    GridViewItemComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    JwSocialButtonsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
