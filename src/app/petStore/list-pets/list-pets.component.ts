import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PetStoreService } from '../pet-store.service';
import { Pet } from '../pet.model';
import { MatDialog } from '@angular/material/dialog';
import { ViewPetDetailsComponent } from '../view-pet-details/view-pet-details.component';
import { DatabaseService } from 'src/app/database.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSelect } from '@angular/material/select';


@Component({
  selector: 'app-list-pets',
  templateUrl: './list-pets.component.html',
  styleUrls: ['./list-pets.component.css']
})
export class ListPetsComponent implements OnInit, AfterViewInit {
  //set the default status to view the list by
  selectedStatus: string = "available";
  @ViewChild(MatSelect)
  public matSelect!: MatSelect;
  //the material table definitions
  @ViewChild(MatSort)
  sort!: MatSort;
  displayedColumns: string[] =
    ['position', 'name', 'status'];
  dataSource = new MatTableDataSource<Pet>();


  loading: boolean = false;
  constructor(public petService: PetStoreService, private ar: ActivatedRoute,
    public dialog: MatDialog, private dbService: DatabaseService) {
    //check if a parameter was specified in the route
    let params = ar.snapshot.params['status']
    if (params != undefined) {
      this.selectedStatus = params;
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    // this.dataSource = this.petService.pets;
    this.filterByStatus();
  }

  //load the items having the chosen status
  filterByStatus() {
    this.loading = true;
    try {
      this.dbService.getData(`pet/findByStatus?status=${this.selectedStatus}`).subscribe(data => {
        // console.log(data)
        this.dataSource.data = data;
        this.loading = false;
      })
    } catch (error) {
      this.loading = false;
    }

  }

  viewDetails(item: Pet) {
    //show the modal with selected pet details
    const dialogRef = this.dialog.open(ViewPetDetailsComponent, {
      width: '450px',
      data: item,
    });


  }

}
