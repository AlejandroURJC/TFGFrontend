import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectorComponent } from './Component/selector/selector.component';

const routes: Routes = [
  {path:'api', component:SelectorComponent},
  {path:'random', component:SelectorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
