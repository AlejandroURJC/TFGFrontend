import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { VuelosService } from 'src/app/Service/vuelos.service';
import { Vuelo } from 'src/app/Model/Vuelo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public datosApi : boolean;
  public datosCargados : boolean;
  public inicio : boolean;
  title = 'vuelosapp';

  constructor(private vuelosService: VuelosService, private http: HttpClient,private router:Router){
    this.datosApi = environment.datosApi;
    this.datosCargados = environment.datosCargados;
    this.inicio = environment.inicio;
  }

  ngOnInit(): void {
    if(!this.datosCargados){
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
      environment.datosCargados = true;
    }
  }

  Duracion(){
    this.inicio = false;
    environment.criterio = 'duracion';
    this.router.navigate(["duracion"]);
  }

  Precio(){
    this.inicio = false;
    environment.criterio = 'coste';
    this.router.navigate(["coste"]);
  }

  Emisiones(){
    this.inicio = false;
    environment.criterio = 'emisiones';
    this.router.navigate(["emisiones"]);
  }

}
