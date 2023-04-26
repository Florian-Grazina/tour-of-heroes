import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Hero } from './hero';
import { Observable, catchError, map, tap, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes'; // URL to web api
  private httpOptions = {
    headers: new HttpHeaders({'content-Type' : 'application/json'})
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }


  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {

    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetch hero id ${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`):
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
  

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`update hero id=${hero.id}`)),
      catchError(this.handleError<Hero>(`updateHero`))
    );
  }


  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(newHero => this.log(`added hero with id=${newHero.id}`)),
      catchError(this.handleError<Hero>(`addHero`))
    );
  }


  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`delete her id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  } 


  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }


  private handleError<T>(operation = 'operation', result?:T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }

}
