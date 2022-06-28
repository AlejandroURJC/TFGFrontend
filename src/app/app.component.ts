import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
      //this.cargarDatos();
      environment.datosCargados = true;
    }
  }

  public cargarDatos() : void{
    if(this.datosApi){     
      this.http.get<JSON>(`/flightlabs`).subscribe(data =>{
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

}
