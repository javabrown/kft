import {Component, Directive} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import { Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {Hello} from    './directives/hello';
import {Tree} from    './components/tree/tree';

import { AppModule } from './app.module';

@Component({
	selector: 'my-app',
	 
	directives: [Hello, ROUTER_DIRECTIVES],
	template: `
	<h1>Hello {{a}}</h1> <br/> <input [(ngModel)]="a" value="{{a}}" hello />
	<br/>
	<a href="#tree">Tree</a>
	`
})

@RouteConfig([
  {path: '/tree', name: 'tree', component: Tree, useAsDefault: true}
  //{path: '/hero/:id', name: 'HeroDetail', component: HeroDetailComponent, useAsDefault: false},
  //{path: '/disaster', name: 'Asteroid', redirectTo: ['CrisisCenter', 'CrisisDetail', {id:3}]}
])
export class MyComponent {
    a : "Raja Khan";
	

};

bootstrap(AppModule, [])