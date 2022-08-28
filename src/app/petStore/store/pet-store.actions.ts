import { Pet } from "../pet.model";

export class AddPet {
  static readonly type = '[Pet] Add';

  constructor(public payload: Pet ) {
  }
}

export class FilterPets {
  static readonly type = '[Pet] Get';

  constructor(public status:string){}
}

export class UpdateSelectedStatus{
  static readonly type = '[Pet] UpdateStatus';

  constructor(public status:string){}
}

