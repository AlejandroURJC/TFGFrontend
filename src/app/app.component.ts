import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public inicio = true;
  title = 'vuelosapp';
  constructor(private router:Router){}

  API(){
    this.inicio = false;
    this.router.navigate(["api"]);
    environment.datosApi = true;
  }

  Random(){
    this.inicio = false;
    this.router.navigate(["random"]);
    environment.datosApi = false;
  }
}
