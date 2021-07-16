import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PostComponent } from './recipe/post/post.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routingComponents,
    
    
  ],
  imports: [
    
    CarouselModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
