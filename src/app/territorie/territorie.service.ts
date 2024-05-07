import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Territorie } from "./territorie";
import {API_URL} from "../app.component";

@Injectable({ providedIn: 'root' })
export class TerritorieService {
  constructor(private http: HttpClient) {}

  getTerritories(): Observable<Territorie[]> {
    return this.http.get<Territorie[]>(`${API_URL}/territories`);
  }

  getTerritoriesPagination(pageSize: number, pageNumber: number): Observable<Territorie[]> {
    return this.http.get<Territorie[]>(`${API_URL}/territories/${pageSize}/${pageNumber}`);
  }

  getTerritorie(id: string): Observable<Territorie> {
    return this.http.get<Territorie>(`${API_URL}/territories/${id}`);
  }

  createTerritories(item: Territorie): Observable<Territorie> {
    return this.http.post<Territorie>(`${API_URL}/territories`, item);
  }

  updateTerritories(item: Territorie): Observable<Territorie> {
    return this.http.put<Territorie>(`${API_URL}/territories/${item.territoryId}`, item);
  }

  deleteTerritories(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/territories/${id}`);
  }
}