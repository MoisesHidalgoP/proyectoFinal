import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoleadoresComponent } from './goleadores.component';

const routes: Routes = [{ path: '', component: GoleadoresComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoleadoresRoutingModule { }
