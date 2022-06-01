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
  public vuelos : Array<String> = [];
  public origin_selected : string = '';
  public destino_selected : string = '';

  constructor(private vuelosService: VuelosService, private router:Router) {
    this.criterio = environment.criterio;
    this.grafoCreado = environment.grafoCreado;
   }

  ngOnInit(): void {
    if(!this.grafoCreado){
      this.vuelosService.createGraph().subscribe(result =>{
        console.log(result);
      })
      environment.grafoCreado = true;
    }  
    
  }

  public getVuelos() : void{
    this.vuelosService.getAeropuertos().subscribe(response =>{
      console.log(response);
      this.vuelos = response;
    });
  }

  public findDestinos(aeropuertos: any[]): any[]{
    return aeropuertos.filter(a => a != this.origin_selected);
  }

  
  public onClick() : void{
    if(this.vuelos.length == 0){
      this.getVuelos(); 
    } 
  }

  /*Debido a que el aeropuerto seleccionado viene acompañado con su código iata, para obtener sólo el nombre del aeropuerto se debe hacer uso de la función substring. Esta nos
    devolverá un nuevo string desde el primer carácter hasta la longitud del texto - 6, tratándose estos 6 carácteres del espacio, del código iata y los paréntesis.
  */
  public onChange(texto : any) : void{    
    this.origin_selected = texto.value;
    console.log(this.origin_selected);
  }

  public onChange2(texto : any) : void{
    var value = texto.value; 
    this.destino_selected = value.substring(0,value.length - 6);;
    console.log(this.destino_selected);
  }

  public getRuta() : void{
    var origin = this.origin_selected.substring(0,this.origin_selected.length - 6);
    this.vuelosService.getRutaOptimizada(origin, this.destino_selected, this.criterio).subscribe(result =>{
      alert(result);
    })
  }

  public cambiarCriterio() : void{
    this.origin_selected = '';
    this.destino_selected = '';
    this.router.navigate(["api"]);

  }

  
}
