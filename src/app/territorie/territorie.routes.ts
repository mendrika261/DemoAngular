import {Routes} from "@angular/router";

export const territorie_routes: Routes = [
  {
    path: '', loadComponent: () =>
      import('./territorie-list.component').then(m => m.TerritorieListComponent)
  },
  {
    path: 'new', loadComponent: () =>
      import('./territorie-form.component').then(m => m.TerritorieFormComponent)
  },
  {
    path: ':id', loadComponent: () =>
      import('./territorie-form.component').then(m => m.TerritorieFormComponent)
  },
  {
    path: 'territorie/:id', loadComponent: () =>
      import('./territorie-list.component').then(m => m.TerritorieListComponent)
  }
  //** end of territories routes */
];