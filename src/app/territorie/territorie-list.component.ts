import { Component, OnInit } from '@angular/core';
import { Territorie } from './territorie';
import { TerritorieService } from './territorie.service';
import {NgFor, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-territories-list',
  templateUrl: './territorie-list.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    FormsModule
  ],
})
export class TerritorieListComponent implements OnInit {
  territories: Territorie[] = [];
  isLoading = false;
  error: string | null = null;
  territoryId:string | null = null;
  pageNumber:number=1;
  pageSize:number=5;

  constructor(private route: ActivatedRoute,
                            private router: Router,private territoriesService: TerritorieService) {}

  ngOnInit(): void {
    this.territoryId = this.route.snapshot.paramMap.get('id');
    this.setPageSize(this.pageSize);
    this.getTerritoriesPagination();
  }

  getTerritories(): void {
    this.isLoading = true;
    this.error = null;
    if(this.territoryId)
        {
          this.territoriesService.getTerritorie(this.territoryId)
                .subscribe({
                  next: territorie => {
                    this.territories = [territorie];
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
            this.territoriesService.getTerritories()
                            .subscribe({
                              next: territories => {
                                this.territories = territories;
                                this.isLoading = false;
                              },
                              error: error => {
                                this.error = error.message;
                                this.isLoading = false;
                              }
                            });
        }

  }

  getTerritoriesPagination(): void {
    this.isLoading = true;
    this.error = null;
    if(this.territoryId)
    {
      this.territoriesService.getTerritorie(this.territoryId)
        .subscribe({
          next: territorie => {
            this.territories = [territorie];
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
      this.territoriesService.getTerritoriesPagination(this.pageSize, this.pageNumber)
        .subscribe({
          next: territories => {
            this.territories = territories;
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
    this.getTerritoriesPagination();
  }

  nextPage(): void {
    this.pageNumber = this.pageNumber + 1;
    this.getTerritoriesPagination();
  }

  previousPage(): void {
    this.pageNumber = this.pageNumber - 1;
    this.getTerritoriesPagination();
  }

  deleteTerritorie(id: number): void {
    if(!confirm('Voulez vous vraiment supprimer ce territorie?'))
      return;

    this.isLoading = true;
    this.error = null;

    this.territoriesService.deleteTerritories(id)
      .subscribe({
        next: () => {
          this.getTerritories();
        },
        error: error => {
          this.error = error.message;
          this.isLoading = false;
        }
      });
  }
}