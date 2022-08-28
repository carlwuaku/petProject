import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/database.service';
import { PetStoreService } from '../pet-store.service';
import { Pet } from '../pet.model';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {
  form!: FormGroup;
  error:boolean = false;
  error_message:string = "";
  loading:boolean = false;
  constructor(private fb:FormBuilder, 
    private snackbar: MatSnackBar,
     private dbService:DatabaseService, public petService:PetStoreService) { }

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
   * performs form validation and submits the form data via http post if form is valid.
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
     
    this.dbService.postData('pet', petData).subscribe(data => {
     
      this.snackbar.open('Pet saved successfully!', '', {
        duration: 3000
      });
      this.loading =false;
      window.history.back();
    })
    } catch (error) {
      this.loading = false;
    }
    
  }

}
