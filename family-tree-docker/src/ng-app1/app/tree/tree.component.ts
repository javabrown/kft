import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 
@Component({
  template: `
    <h2>Family Tree</h2>
    <ul class="items">
      <li *ngFor="let hero of heroes"
        (click)="alert(hero)">
        <span class="badge">{{hero}}</span> {{hero.name}}
      </li>
    </ul>
    
    <hero-detail>
    </hero-detail>
  `,
  directives: [HeroDetailComponent]
})
export class HeroListComponent implements OnInit, OnDestroy {
  heroes: Hero[10, 20, 30];

 
  constructor(
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    console.log('hero list: fetching all heroes (expensive operation)');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}