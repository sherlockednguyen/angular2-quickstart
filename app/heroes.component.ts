import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router } from '@angular/router-deprecated';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls: ['app/heroes.component.css']
})
export class HeroesComponent implements OnInit {
	constructor(
		private heroService: HeroService,
		private router: Router
		){}
	ngOnInit() {
		this.getHeroes();
	}
	selectedHero:Hero;
	public heroes: Hero[];
	onSelect(hero:Hero) {
		this.selectedHero = hero;
	}
	getHeroes() {
		this.heroService.getHeroes().then(heroes => this.heroes = heroes);
	}

	gotoDetail(){
		this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
	}
}