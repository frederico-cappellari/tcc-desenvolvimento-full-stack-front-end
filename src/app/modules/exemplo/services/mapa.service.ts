import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MapaService {

  constructor(private http: HttpClient) { }

  reverseGeocode(latitude: number, longitude: number): Observable<any> {
    const apiKey = environment.mapsKey;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    return this.http.get(url);
  }

}
