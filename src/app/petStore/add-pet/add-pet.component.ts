import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/database.service';
import { PetStoreService } from '../pet-store.service';
import { Pet } from '../pet.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PetState } from 'src/app/petStore/store/pet.state';
import { Select, Store } from '@ngxs/store';
import { AddPet, FilterPets } from '../store/pet-store.actions';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  error:boolean = false;
  error_message:string = "";
  loading:boolean = false;

  @Select(PetState.getSelectedStatus) lastStatus$!:Observable<string>;
  petStatusSubscription!:Subscription;
  addPetSubsciption!:Subscription;
  constructor(private fb:FormBuilder, 
    private snackbar: MatSnackBar,
     private dbService:DatabaseService, 
     public petService:PetStoreService,
     private store:Store) { }

  ngOnDestroy(): void {

    this.petStatusSubscription?.unsubscribe();
    this.addPetSubsciption?.unsubscribe();
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        name: ['', Validators.required],
        status: ['', Validators.required],
        image:['']
      }
    )
  }


  /**
   * performs form validation and submits the form data via the dispatch AddPet if form is valid.
   * it goes back to the previous page if the transaction is successful, displays an error message
   * otherwise
   * @returns void
   */
  submitForm(){
    if(!this.form.valid){
      this.error = true;
      this.error_message = "Please fill the form appropriately";
      return;
    }
    this.loading = true;
    const petData:Pet = {
      name: this.form.get('name')?.value,
      photoUrls: [this.form.get('image')?.value],
      status: this.form.get('status')?.value
    }
    try {
      
    // this.dbService.postData('pet', petData)
    this.addPetSubsciption =  this.store.dispatch(new AddPet(petData)).subscribe(data => {
       //check the last status. if it's different from the current status, reload the data
       //to match that
      this.refreshList(petData.status)
     
      this.snackbar.open('Pet saved successfully!', '', {
        duration: 3000
      });
      this.loading =false;
      window.history.back();
    })
    } catch (error) {
      console.log(error)
    }
    finally{
      this.loading = false;
    }
    
  }


  /**
   * check if the status of the incoming pet is different from the last set status. if so,
   * load ffrom the dataase. else it is just added to teh list in our store
   * @param newStatus string the incoming status
   */
  refreshList(newStatus:string){
    this.petStatusSubscription =  this.lastStatus$.subscribe(currentStatus => {
      if(newStatus != currentStatus){
        this.store.dispatch(new FilterPets(newStatus))
      }
    })
  }
}
