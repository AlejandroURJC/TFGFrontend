import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { VuelosService } from 'src/app/Service/vuelos.service';
import { Vuelo } from 'src/app/Model/Vuelo';


@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {
  public datosApi : boolean;
  public vuelos : Array<String> = [];
  public origin_selected : string = '';
  public destino_selected : string = '';

  constructor(private vuelosService: VuelosService, private http: HttpClient) {
    this.datosApi = environment.datosApi;
   }

  ngOnInit(): void {
    if(this.datosApi){     
      this.http.get("assets/flights.json").subscribe(data =>{
        for(let temp of JSON.parse(JSON.stringify(data))){
          if((temp.flight_status !== "cancelled") && !(temp.departure.airport == null || temp.arrival.airport == null)){
            let v : Vuelo = {
              "iataOrigen" : temp.departure.iata,
              "aeropuertoOrigen" : temp.departure.airport,
              "iataDestino" : temp.arrival.iata,
              "aeropuertoDestino" : temp.arrival.airport,
              "fechaSalida" : temp.departure.estimated,
              "fechaLlegada" : temp.arrival.estimated
            };
            console.log(v);
              
            this.vuelosService.addVuelo(v).subscribe(response =>{
              console.log(response);
            });                         
          }
        }        
      });
      
    }
    else{
      this.vuelosService.generateVuelos().subscribe(result =>{
        console.log(result);
      })
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

  public createGraph() : void{
    this.vuelosService.createGraph().subscribe(result =>{
      console.log(result);
    })
  }
 
  public onClick() : void{
    if(this.vuelos.length == 0){
      this.getVuelos(); 
      this.createGraph();
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
    this.vuelosService.getRutaOptimizada(origin, this.destino_selected).subscribe(result =>{
      alert(result);
    })
  }

  
}
