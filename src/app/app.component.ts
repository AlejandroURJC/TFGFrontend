import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { VuelosService } from 'src/app/Service/vuelos.service';
import { Vuelo } from 'src/app/Model/Vuelo';
declare function changeFont(param: string): any; // just change here from arun answer.

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public datosApi : boolean;
  public datosCargados : boolean;
  public inicio : boolean;
  public texto_adaptado : boolean;
  title = 'vuelosapp';

  constructor(private vuelosService: VuelosService, private http: HttpClient,private router:Router){
    this.datosApi = environment.datosApi;
    this.datosCargados = environment.datosCargados;
    this.inicio = environment.inicio;
    this.texto_adaptado = environment.texto_adaptado;
  }

  ngOnInit(): void {
    if(!this.datosCargados){
      this.cargarDatos();
      environment.datosCargados = true;
    }
  }

  public cargarDatos() : void{
    if(this.datosApi){ 
      //Datos API guardados en el proyecto: 'assets/flights.json'
      //Datos API en tiempo real: '/flightlabs'    
      this.http.get<JSON>('assets/flights.json').subscribe(data =>{
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
      });
    }
  }

  CriterioSeleccionado(criterio : string){
    this.inicio = false;
    environment.criterio = criterio;
    this.router.navigate([criterio]);
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


