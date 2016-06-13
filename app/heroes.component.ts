import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router } from '@angular/router-deprecated';
import { HeroDetailComponent } from './hero-detail.component'

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls: ['app/heroes.component.css'],
  directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit {
	addingHero: boolean = false;
	error: any;
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

	addHero() {
		this.addingHero = true;
		this.selectedHero = null;
	}

	close(savedHero: Hero) {
		this.addingHero = false;
		if (savedHero) { this.getHeroes(); }
	}

	delete(hero: Hero, event: any) {
		event.stopPropagation();
		this.heroService
			.delete(hero)
			.then(res => {
				this.heroes = this.heroes.filter(h => h !== hero);
				if (this.selectedHero === hero) { this.selectedHero = null; }
			})
			.catch(error => this.error = error); // TODO: Display error message
	}
}