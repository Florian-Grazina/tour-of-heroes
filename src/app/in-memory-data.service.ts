import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'PainGratos'},
      { id: 2, name: 'Skarlah'},
      { id: 3, name: 'Moakane'},
      { id: 4, name: 'Arth'},
      { id: 5, name: 'Elder'},
      { id: 6, name: 'Jarno'},
      { id: 7, name: 'Blackbull'},
      { id: 8, name: 'Cross'},
      { id: 9, name: 'Zenarus'},
      { id: 10, name: 'Bruno'},
      { id: 11, name: 'Test'},
      { id: 12, name: 'Fake API'}
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (1).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 1;
  }
}