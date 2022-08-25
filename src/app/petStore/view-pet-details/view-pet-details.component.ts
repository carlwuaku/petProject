import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pet } from '../pet.model';

@Component({
  selector: 'app-view-pet-details',
  templateUrl: './view-pet-details.component.html',
  styleUrls: ['./view-pet-details.component.css']
})
export class ViewPetDetailsComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ViewPetDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pet) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close()
  }

}
