import {Routes} from "@angular/router";

export const region_routes: Routes = [
  {
    path: '', loadComponent: () =>
      import('./region-list.component').then(m => m.RegionListComponent)
  },
  {
    path: 'new', loadComponent: () =>
      import('./region-form.component').then(m => m.RegionFormComponent)
  },
  {
    path: ':id', loadComponent: () =>
      import('./region-form.component').then(m => m.RegionFormComponent)
  },
  {
    path: 'region/:id', loadComponent: () =>
      import('./region-list.component').then(m => m.RegionListComponent)
  }
  //** end of regions routes */
];