import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Vuelo } from '../Model/Vuelo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VuelosService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getVuelos(): Observable<Vuelo[]> {
    return this.http.get<Vuelo[]>(`${this.apiServerUrl}/all`);
  }

  public getAeropuertos(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiServerUrl}/distinctAllAeropuertos`);
  }

  public addVuelo(vuelo : Vuelo): Observable<Vuelo> {
    return this.http.post<Vuelo>(`${this.apiServerUrl}/add`, vuelo);
  }

  public generateVuelos() : Observable<Vuelo[]> {
    return this.http.get<Vuelo[]>(`${this.apiServerUrl}/generateVuelos`);
  }

  public createGraph(): Observable<string> {
    return this.http.get<string>(`${this.apiServerUrl}/createGraph`, {responseType: 'text' as 'json'});
  }

  public getRutaOptimizada(aeropuertoOrigen: string, aeropuertoDestino: string, criterio : string): Observable<string> {
    return this.http.get<string>(`${this.apiServerUrl}/${aeropuertoOrigen}/${aeropuertoDestino}/${criterio}`, {responseType: 'text' as 'json'});
  }

}
