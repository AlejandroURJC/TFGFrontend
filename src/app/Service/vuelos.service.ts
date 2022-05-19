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

  public getAeropuertos(): Observable<String[]> {
    return this.http.get<String[]>(`${this.apiServerUrl}/distinctAllAeropuertos`);
  }

  public addVuelo(vuelo : Vuelo): Observable<Vuelo> {
    return this.http.post<Vuelo>(`${this.apiServerUrl}/add`, vuelo);
  }

  public generateVuelos() : Observable<Vuelo[]> {
    return this.http.get<Vuelo[]>(`${this.apiServerUrl}/generateVuelos`);
  }

  public createGraph(): Observable<String[]> {
    return this.http.get<String[]>(`${this.apiServerUrl}/createGraph`);
  }

  public deleteGraph(): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/deleteGraph`);
  }

  public getRutaOptimizada(aeropuertoOrigen: string, aeropuertoDestino: string): Observable<String> {
    return this.http.get<String>(`${this.apiServerUrl}/${aeropuertoOrigen}/${aeropuertoDestino}`, {responseType: 'text' as 'json'});
  }

  public deleteVuelos(): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/deleteAll`);
  }
}
