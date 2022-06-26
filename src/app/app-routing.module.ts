import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SelectorComponent } from './Component/selector/selector.component';

const routes: Routes = [
  {path:'duracion', component:SelectorComponent},
  {path:'coste', component:SelectorComponent},
  {path:'emisiones', component:SelectorComponent},
  {path:'ini', component:AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
