import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VuelosService } from 'src/app/Service/vuelos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {
  public criterio : string;
  public grafoCreado : boolean
  public aeropuertos : Array<String>;
  public origin_selected : string;
  public destino_selected : string;

  constructor(private vuelosService: VuelosService, private router:Router) {
    this.criterio = environment.criterio;
    this.grafoCreado = environment.grafoCreado;
    this.origin_selected = environment.origin_selected;
    this.destino_selected = environment.destino_selected;
    this.aeropuertos = environment.vuelos.split(',');
   }

  ngOnInit(): void {
    if(!this.grafoCreado){
      this.vuelosService.createGraph().subscribe(result =>{
        console.log(result);
      })
      environment.grafoCreado = true;
    }  
    
  }

  public getAeropuertos() : void{
    this.vuelosService.getAeropuertos().subscribe(response =>{
      console.log(response);
      environment.vuelos = response.toString();
      this.aeropuertos = environment.vuelos.split(',');
      
    });
  }

  public findAeropuertosValidos(aeropuertos: any[], origenes: boolean): any[]{
    if(origenes)
      return aeropuertos.filter(a => a != this.destino_selected);
    else
      return aeropuertos.filter(a => a != this.origin_selected);
  }

  public onClick() : void{
    if(this.aeropuertos.length == 1){
      this.getAeropuertos(); 
    } 
  }

 
  public onChange(texto : any) : void{
    if(this.destino_selected == texto.value){
      environment.destino_selected = 'null';
      this.destino_selected = environment.destino_selected;
    }
    environment.origin_selected = texto.value;    
    this.origin_selected = environment.origin_selected;
    console.log(this.origin_selected);
    
  }

  public onChange2(texto : any) : void{  
    environment.destino_selected = texto.value;
    this.destino_selected = environment.destino_selected;
    console.log(this.destino_selected);

  }

  /*Debido a que el aeropuerto seleccionado viene acompañado con su código iata, para obtener sólo el nombre del aeropuerto se debe hacer uso de la función substring. Esta nos
    devolverá un nuevo string desde el primer carácter hasta la longitud del texto - 6, tratándose estos 6 carácteres del espacio, del código iata y los paréntesis.
  */
  public getRuta() : void{
    var origin = this.origin_selected.substring(0,this.origin_selected.length - 6);
    var destiny = this.destino_selected.substring(0,this.destino_selected.length - 6);
    this.vuelosService.getRutaOptimizada(origin, destiny, this.criterio).subscribe(result =>{
      alert(result);
    })
  }

  public cambiarCriterio() : void{
    environment.inicio = true;
    this.router.navigate(["ini"]);
  }

  public reiniciar() : void{
    this.origin_selected = 'null';
    this.destino_selected = 'null';
    environment.origin_selected = this.origin_selected;
    environment.destino_selected = this.destino_selected;
  }

  public flip() : void{
    var aux = environment.origin_selected;
    environment.origin_selected = environment.destino_selected;
    environment.destino_selected = aux;
    this.origin_selected = environment.origin_selected;
    this.destino_selected = environment.destino_selected; 
  }
 
}
