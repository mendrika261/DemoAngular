import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Region } from "./region";
import {API_URL} from "../app.component";

@Injectable({ providedIn: 'root' })
export class RegionService {
  constructor(private http: HttpClient) {}

  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(`${API_URL}/regions`);
  }

  getRegionsPagination(pageSize: number, pageNumber: number): Observable<Region[]> {
    return this.http.get<Region[]>(`${API_URL}/regions/${pageSize}/${pageNumber}`);
  }

  getRegion(id: string): Observable<Region> {
    return this.http.get<Region>(`${API_URL}/regions/${id}`);
  }

  createRegions(item: Region): Observable<Region> {
    return this.http.post<Region>(`${API_URL}/regions`, item);
  }

  updateRegions(item: Region): Observable<Region> {
    return this.http.put<Region>(`${API_URL}/regions/${item.regionId}`, item);
  }

  deleteRegions(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/regions/${id}`);
  }
}