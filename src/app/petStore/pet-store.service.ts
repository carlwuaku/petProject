import { Injectable } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Pet } from './pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetStoreService {

  constructor(private dbService:DatabaseService) { }
  statuses:string[] = ["available", "pending", "sold"];
  pets:Pet[] = [];
}