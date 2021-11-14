import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router'; 
import { CardComponent }  from './Card/card.component';

const routes: Routes = [
  {path: 'card', component: CardComponent },
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes)],
  exports: [ CommonModule,RouterModule]

})
export class AppRoutingModule { }
