import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';

import { Hero, HeroService } from './hero.service';

@Component({
  template: `
  <h2>HERO DETAILS</h2>
  <div *ngIf="hero">
    <h3>"{{hero.name}}"</h3>
    <div>
      <label>Id: </label>{{hero.id}}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="hero.name" placeholder="name"/>
    </div>
    <p>
      <button (click)="gotoHeroes()">Back</button>
    </p>
  </div>
  `,
  selector: "hero-detail"
})
export class HeroDetailComponent implements OnInit, OnDestroy  {
  hero: Hero;

  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       let id = params['id'];
       
       if (!id) {
         return;
       }
       
       console.log('hero detail: fetching hero', id);
       this.service.getHero(id).then(hero => this.hero = hero);
     });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoHeroes() {
    this.router.navigate(['/heroes']);
  }
}


