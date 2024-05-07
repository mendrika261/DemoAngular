import { Routes } from '@angular/router';
import { region_routes } from './region/region.routes';
import { territorie_routes } from './territorie/territorie.routes';


export const routes: Routes = [
  {
	path: 'regions',
	children: region_routes
	},
{
	path: 'territories',
	children: territorie_routes
	},

];