import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
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
      this.form.reset();
      this.snackbar.open('Pet saved successfully!', '', {
        duration: 3000
      });
      this.loading =false;
    })
    } catch (error) {
      this.loading = false;
    }
    
  }

}
