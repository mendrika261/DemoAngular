import { Component, OnInit } from '@angular/core';
import { Region } from './region';
import { RegionService } from './region.service';
import {NgFor, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-regions-list',
  templateUrl: './region-list.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    FormsModule
  ],
})
export class RegionListComponent implements OnInit {
  regions: Region[] = [];
  isLoading = false;
  error: string | null = null;
  regionId:string | null = null;
  pageNumber:number=1;
  pageSize:number=5;

  constructor(private route: ActivatedRoute,
                            private router: Router,private regionsService: RegionService) {}

  ngOnInit(): void {
    this.regionId = this.route.snapshot.paramMap.get('id');
    this.setPageSize(this.pageSize);
    this.getRegionsPagination();
  }

  getRegions(): void {
    this.isLoading = true;
    this.error = null;
    if(this.regionId)
        {
          this.regionsService.getRegion(this.regionId)
                .subscribe({
                  next: region => {
                    this.regions = [region];
                    this.isLoading = false;
                  },
                  error: error => {
                    this.error = error.message;
                    this.isLoading = false;
                  }
                });
        }
        else
        {
            this.regionsService.getRegions()
                            .subscribe({
                              next: regions => {
                                this.regions = regions;
                                this.isLoading = false;
                              },
                              error: error => {
                                this.error = error.message;
                                this.isLoading = false;
                              }
                            });
        }

  }

  getRegionsPagination(): void {
    this.isLoading = true;
    this.error = null;
    if(this.regionId)
    {
      this.regionsService.getRegion(this.regionId)
        .subscribe({
          next: region => {
            this.regions = [region];
            this.isLoading = false;
          },
          error: error => {
            this.error = error.message;
            this.isLoading = false;
          }
        });
    }
    else
    {
      this.regionsService.getRegionsPagination(this.pageSize, this.pageNumber)
        .subscribe({
          next: regions => {
            this.regions = regions;
            this.isLoading = false;
          },
          error: error => {
            this.error = error.message;
            this.isLoading = false;
          }
        });
    }
  }

  setPageSize(nbr: number): void {
    this.pageSize = nbr;
    this.getRegionsPagination();
  }

  nextPage(): void {
    this.pageNumber = this.pageNumber + 1;
    this.getRegionsPagination();
  }

  previousPage(): void {
    this.pageNumber = this.pageNumber - 1;
    this.getRegionsPagination();
  }

  deleteRegion(id: number): void {
    if(!confirm('Voulez vous vraiment supprimer ce region?'))
      return;

    this.isLoading = true;
    this.error = null;

    this.regionsService.deleteRegions(id)
      .subscribe({
        next: () => {
          this.getRegions();
        },
        error: error => {
          this.error = error.message;
          this.isLoading = false;
        }
      });
  }
}