import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiClientServiceService {

  // inject httpClient Service
  constructor(private http: HttpClient) { }
}
