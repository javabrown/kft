import {Component, Directive,NgModule} from 'angular2/core';
//import { NgModule } from '@angular/core';

//import { FormsModule } from '@angular/forms';
//import {FormsModule} from 'angular2/forms';

//import { HttpModule } from '@angular/http';

import { RouterModule }   from 'angular2/router';

import {HttpModule} from 'angular2/http';

import { Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

 
 
//import { MyComponent } from './main';
import { AppRoutes } from './app.routes';

import { Tree } from './components/tree/tree';
import { Unknown } from './components/unknown';
 
@NgModule({
  declarations: [
    Tree, Unknown
  ],
  imports: [
    //BrowserModule,
    //FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes)
 
  ],
  providers: [],
  bootstrap: [Tree]
})
export class AppModule { }
