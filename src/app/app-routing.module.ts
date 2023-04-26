import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';


const routes: Routes = [
  // {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'heroes', component: HeroesComponent},
  {path: 'home', component: DashboardComponent},
  {path: 'detail/:id', component: HeroDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
