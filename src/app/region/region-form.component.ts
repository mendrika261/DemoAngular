import { Component, OnInit } from '@angular/core';
import { Region } from './region';
import { RegionService } from './region.service';
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-regions-form',
  templateUrl: './region-form.component.html',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    FormsModule,
    NgForOf
  ],
})
export class RegionFormComponent implements OnInit {
  region: Region = {} as Region;
  regionId: string | null = null;
  error: string | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private regionsService: RegionService,
    
  ) {}

  ngOnInit(): void {
    this.regionId = this.route.snapshot.paramMap.get('id');
    if (this.regionId) {
      this.getItem(this.regionId);
    }
    
  }

  getItem(id: string): void {
    this.regionsService.getRegion(id)
      .subscribe({
        next: region => {
          this.region = region;
        },
        error: error => {
          this.error = error.message;
        }
      });
  }

  onSubmit(): void {
    this.error = null;

    if (this.regionId) {
      this.regionsService.updateRegions(this.region)
        .subscribe({
          next: () => {
            this.router.navigate(['/regions']).then(r => r);
          },
          error: error => {
            this.error = error.message;
          }
        });
    } else {
      this.regionsService.createRegions(this.region)
        .subscribe({
          next: () => {
            this.router.navigate(['/regions']).then(r => r);
          },
          error: error => {
            this.error = error.message;
          }
        });
    }
  }


  
}