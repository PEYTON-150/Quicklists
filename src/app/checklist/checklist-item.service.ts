import {  Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Checklist } from '../interfaces/checklists';
import { map, filter, take, shareReplay, tap } from "rxjs/operators";
import { AddChecklistItem, ChecklistItem, } from '../interfaces/checklist-item';
import { StorageService } from "../services/storage.service";

@Injectable ({
    providedIn: 'root',


})

export class ChecklistItemService{
    private checklistItems$ = new BehaviorSubject < ChecklistItem[] >([]);

    getItemsbyChecklistId(checklistId: string) {
        return this.checklistItems$.pipe(
        map((items)=> items.filter((item)=> item.checklistId===checklistId)),
        tap(() => this.storageService.saveChecklistItems(this.checklistItems$.value))
             
        );

    }
    constructor(private storageService: StorageService){}
    load(){
        this.storageService.loadChecklistItems$.pipe(take(1)).subscribe((checklistItems)=> {
          this.checklistItems$.next(checklistItems);
        });

        }


    add(item: AddChecklistItem, checklistId:string){

        const newItem = {
            id: Date.now().toString(),
            checklistId,
            checked:false,
            ...item,



        }
    
    this.checklistItems$.next([...this.checklistItems$.value,newItem]);
    };

    toggle(itemId:string) {
        const newItems = this.checklistItems$.value.map((item)=> item.id === itemId ? {...item, checked: !item.checked}: item);

        this.checklistItems$.next(newItems);

    }
    reset(checklistId: string) {
        const newItems = this.checklistItems$.value.map((item)=> item.checklistId === checklistId ? {... item, checked: false}: item);

        this.checklistItems$.next(newItems);

    }
}











