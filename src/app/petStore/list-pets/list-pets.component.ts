import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PetStoreService } from '../pet-store.service';
import { Pet } from '../pet.model';
import { MatDialog } from '@angular/material/dialog';
import { ViewPetDetailsComponent } from '../view-pet-details/view-pet-details.component';
import { DatabaseService } from 'src/app/database.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSelect } from '@angular/material/select';
import { Observable, Subscription, tap } from 'rxjs';
import { PetState } from 'src/app/petStore/store/pet.state';
import { Select, Store } from '@ngxs/store';
import { FilterPets, UpdateSelectedStatus } from 'src/app/petStore/store/pet-store.actions';


@Component({
  selector: 'app-list-pets',
  templateUrl: './list-pets.component.html',
  styleUrls: ['./list-pets.component.css']
})
export class ListPetsComponent implements OnInit, AfterViewInit, OnDestroy {
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


  //adding redux
  @Select(PetState.getPetsList) petList$!:Observable<Pet[]>;
  @Select(PetState.arePetsLoaded) arePetsLoaded$!:Observable<boolean>;
  @Select(PetState.getSelectedStatus) lastStatus$!:Observable<string>;
  petsLoadedSubscription!:Subscription;
  petStatusSubscription!:Subscription;

  constructor(public petService: PetStoreService,
     private ar: ActivatedRoute,private store: Store,
    public dialog: MatDialog, private dbService: DatabaseService) {
    //check if a parameter was specified in the route
    let params = this.ar.snapshot.params['status']
    if (params != undefined) {
      this.selectedStatus = params;
    }
  }
  ngOnDestroy(): void {
     this.petsLoadedSubscription?.unsubscribe();
     this.petStatusSubscription?.unsubscribe();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    // this.filterByStatus();
    this.loadFromStore();
    this.petStatusSubscription =  this.lastStatus$.pipe(
      tap((status) =>{

        this.selectedStatus = status;
        console.log("subscribe on status called", status)
      }) 
    ).subscribe(value => {
      console.log(value)
    });
  }



  /**
   * load the items having the chosen status
   * */
  filterByStatus() {
    //update the status in the store
    this.store.dispatch(new UpdateSelectedStatus(this.selectedStatus))
    this.store.dispatch(new FilterPets(this.selectedStatus))
    
    // this.loading = true;
    // try {
    //  this.dbSubscription = this.dbService.getData(`pet/findByStatus?status=${this.selectedStatus}`).subscribe(data => {
    //     // console.log(data)
    //     this.dataSource.data = data;
    //   })
    // } catch (error) {

    // }
    // finally{
    //   this.loading = false;
    // }

  }

  viewDetails(item: Pet) {
    //show the modal with selected pet details
    const dialogRef = this.dialog.open(ViewPetDetailsComponent, {
      width: '450px',
      data: item,
    });


  }

  loadFromStore(){
    this.petsLoadedSubscription =  this.arePetsLoaded$.pipe(
      tap((arePetsLoaded) =>{

        //if it's been loaded, and the status has not 
        //changed, don't load
        if(!arePetsLoaded){
          this.store.dispatch(new FilterPets(this.selectedStatus))
        }
      }) 
    ).subscribe(value => {
      console.log(value)
    });
  }

}
