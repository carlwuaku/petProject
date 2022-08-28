import { Pet } from "../pet.model";
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { PetStoreService } from "../pet-store.service";
import { AddPet, FilterPets, UpdateSelectedStatus } from "./pet-store.actions";
import { tap } from "rxjs";
import { Injectable } from '@angular/core';

export class PetStateModel {
    pets: Pet[] = [];
    petsLoaded: boolean = false;
    status: string = "available";
}

@State<PetStateModel>({
    name: 'pets',
    defaults: {
        pets: [],
        petsLoaded: false,
        status: "available"
    }
})
@Injectable()
export class PetState {
    constructor(private petStoreService: PetStoreService) {

    }

    

    @Selector()
    static getPetsList(state: PetStateModel) {
        return state.pets;
    }

    @Selector()
    static arePetsLoaded(state: PetStateModel) {
        return state.petsLoaded;
    }




    @Selector()
    static getSelectedStatus(state: PetStateModel) {
        return state.status;
    }


    //actions to add pets or filter pets when status change
    @Action(FilterPets)
    filterPets({ getState, setState }: StateContext<PetStateModel>,
        { status }: FilterPets) {
        return this.petStoreService.filterPetsByStatus(status).pipe(
            tap(result => {
                const state = getState();
                setState({
                    ...state,
                    pets: result,
                    petsLoaded: true,
                    status: status
                })
            })
        )
    }

    @Action(AddPet)
    addPet({ getState, setState }: StateContext<PetStateModel>,
        { payload }: AddPet) {
        return this.petStoreService.addPet(payload).pipe(
            tap(
                result => {
                    //only add if the current status is 
                    //the same as the pet's status
                    const state = getState();
                    if (state.status == payload.status) {
                        const newPetList = state.pets;
                        newPetList.push(payload);

                        setState({
                            ...state,
                            pets: newPetList
                        })
                    }
                }
            )
        )
    }

    /**
     * when the status is updated it's expected to call the filterlist method
     */
    @Action(UpdateSelectedStatus)
    updateSelectedStatus({ getState, setState }: StateContext<PetStateModel>,
        { status }: FilterPets){
            const state = getState();
            setState({
                ...state,
                status: status
            })
        }


}