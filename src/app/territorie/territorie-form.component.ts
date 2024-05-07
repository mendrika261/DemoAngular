import { Component, OnInit } from '@angular/core';
import { Territorie } from './territorie';
import { TerritorieService } from './territorie.service';
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { Region } from '../region/region';
import { RegionService } from '../region/region.service';


@Component({
  selector: 'app-territories-form',
  templateUrl: './territorie-form.component.html',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    FormsModule,
    NgForOf
  ],
})
export class TerritorieFormComponent implements OnInit {
  territorie: Territorie = {} as Territorie;
  territorieId: string | null = null;
  error: string | null = null;
  regions:Region[]=[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private territoriesService: TerritorieService,
    private regionsService: RegionService,

  ) {}

  ngOnInit(): void {
    this.territorieId = this.route.snapshot.paramMap.get('id');
    if (this.territorieId) {
      this.getItem(this.territorieId);
    }
    this.getRegions();

  }

  getItem(id: string): void {
    this.territoriesService.getTerritorie(id)
      .subscribe({
        next: territorie => {
          this.territorie = territorie;
        },
        error: error => {
          this.error = error.message;
        }
      });
  }

  onSubmit(): void {
    this.error = null;

    if (this.territorieId) {
      this.territoriesService.updateTerritories(this.territorie)
        .subscribe({
          next: () => {
            this.router.navigate(['/territories']).then(r => r);
          },
          error: error => {
            this.error = error.message;
          }
        });
    } else {
      this.territoriesService.createTerritories(this.territorie)
        .subscribe({
          next: () => {
            this.router.navigate(['/territories']).then(r => r);
          },
          error: error => {
            this.error = error.message;
          }
        });
    }
  }


  getRegions():void
{
 this.regionsService.getRegions().subscribe( {
 next: (regions)=>{this.regions=regions;},error:error=>{
 this.error=error.message;
}
});
}

}