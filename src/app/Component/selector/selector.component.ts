import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VuelosService } from 'src/app/Service/vuelos.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare function changeFont(param: string): any;

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {
  public criterio : string;
  public grafoCreado : boolean
  public aeropuertos : Array<string>;
  public origin_selected : string;
  public destino_selected : string;
  public ruta_calculada : string = '';
  public texto_adaptado : boolean;

  constructor(private vuelosService: VuelosService, private router:Router, private modalService: NgbModal) {
    this.criterio = environment.criterio;
    this.grafoCreado = environment.grafoCreado;
    this.origin_selected = environment.origin_selected;
    this.destino_selected = environment.destino_selected;
    this.aeropuertos = environment.vuelos.split(',');
    this.texto_adaptado = environment.texto_adaptado;
   }

  ngOnInit(): void {
    if(!this.grafoCreado){
      this.getAeropuertos();
      this.vuelosService.createGraph().subscribe(
        //console.log(result)  
      );   
      environment.grafoCreado = true;
    }  
    
  }

  public getAeropuertos() : void{
    this.vuelosService.getAeropuertos().subscribe(response =>{
      //console.log(response);
      environment.vuelos = response.toString();
      this.aeropuertos = environment.vuelos.split(',');
      
    });
  }

  public findAeropuertosValidos(aeropuertos: any[]): any[]{
    return aeropuertos.filter(a => a != this.origin_selected);
  }

  public onChange(texto : any) : void{
    if(this.destino_selected == texto.value){
      environment.destino_selected = 'null';
      this.destino_selected = environment.destino_selected;
    }
    environment.origin_selected = texto.value;    
    this.origin_selected = environment.origin_selected;
    //console.log(this.origin_selected);
    
  }

  public onChange2(texto : any) : void{  
    environment.destino_selected = texto.value;
    this.destino_selected = environment.destino_selected;
    //console.log(this.destino_selected);

  }

  /*Debido a que el aeropuerto seleccionado viene acompañado con su código iata, para obtener sólo el nombre del aeropuerto se debe hacer uso de la función substring. Esta nos
    devolverá un nuevo string desde el primer carácter hasta la longitud del texto - 6, tratándose estos 6 carácteres del espacio, del código iata y los paréntesis.
  */
  public getRuta(content: any) : void{
    let origin = this.origin_selected.substring(0,this.origin_selected.length - 6);
    let destiny = this.destino_selected.substring(0,this.destino_selected.length - 6);
    this.vuelosService.getRutaOptimizada(origin, destiny, this.criterio).subscribe(result =>{
      this.ruta_calculada = result;
    })
    this.modalService.open(content, { windowClass: 'dark-modal', size: 'xl', centered: true });
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
    let aux = environment.origin_selected;
    environment.origin_selected = environment.destino_selected;
    environment.destino_selected = aux;
    this.origin_selected = environment.origin_selected;
    this.destino_selected = environment.destino_selected; 
  }

  changeFont(operator: string){
    changeFont(operator);
    if(operator === '+'){
      environment.texto_adaptado = true;
      this.texto_adaptado = true;
    }
    else{
      environment.texto_adaptado = false;
      this.texto_adaptado = false;
    }  
  }
 
}
