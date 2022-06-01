import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriterioComponent } from './Component/criterio/criterio.component';
import { SelectorComponent } from './Component/selector/selector.component';

const routes: Routes = [
  {path:'api', component:CriterioComponent},
  {path:'random', component:CriterioComponent},
  {path:'duracion', component:SelectorComponent},
  {path:'coste', component:SelectorComponent},
  {path:'emisiones', component:SelectorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
