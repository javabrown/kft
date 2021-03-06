import { Component }          from '@angular/core';
import { ROUTER_DIRECTIVES, Router }  from '@angular/router';

import { HeroService }    from './heroes/hero.service';

@Component({
  selector: 'my-app',
  template: `
    <pre>
 
      current route: {{ route }}
    </pre>
    
    <nav>
      <a [routerLink]="['/']">Home</a>
      <a [routerLink]="['/heroes']">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  providers:  [
    HeroService
  ],
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {
  constructor(private router: Router) {
  }
  
  get route() {
    return this.router.routerState.snapshot.url.toString();
  }
}