import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy,Component, NgModule } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { switchMap, filter, map } from "rxjs";
import { ChecklistService } from "../services/check-list-data.service";
import { BehaviorSubject, combineLatest } from "rxjs";
import { Validators, FormBuilder } from "@angular/forms";
import { FormModalComponentModule } from "../ui/form-modal.component";
import { ChecklistItemService } from "./checklist-item.service";
import { Checklist } from "../interfaces/checklists";
import { ChecklistItemListComponentModule } from "./checklist-item-list.component";






@Component({
    selector: 'app-checklist',
    template:
    `<ng-container *ngIf=" vm$ | async as vm">
    <ion-header><ion-toolbar>
    <ion-buttons slot="start">
    <ion-back-button defaultHref="/"></ion-back-button>
    </ion-buttons>
    
    <ion-title >{{ vm.checklist.title }}</ion-title>
    <ion-buttons slot="end">

<ion-button (click)="resetChecklistItems(vm.checklist.id)">
<ion-icon name="refresh" slot="icon-only"></ion-icon>
</ion-button>

    <ion-button (click)="formModalIsOpen$.next(true)">
    <ion-icon name="add" slot="icon-only">
    </ion-icon>
     </ion-button>
    
    </ion-buttons>

    </ion-toolbar>
    </ion-header>
    <ion-content>
    <app-checklist-item-list [checklistItems]="vm.items" (toggle)="toggleChecklistItem($event)"></app-checklist-item-list>
    <ion-modal 
    [isOpen]="vm.formModalIsOpen"   [canDismiss]="true"   (ionModalDidDismiss)="formModalIsOpen$.next(false)">

    <ng-template>
    <app-form-modal title ="Create Item" [formGroup]="checklistItemForm" (save)="addChecklistItem(vm.checklist.id)"></app-form-modal>
    
    </ng-template>
    </ion-modal>

    </ion-content> 
    </ng-container>`,
    changeDetection: ChangeDetectionStrategy.OnPush,

})

export class ChecklistComponent{
    constructor(private route:ActivatedRoute, private checklistService: ChecklistService, private fb: FormBuilder, private checklistItemService: ChecklistItemService){}


    addChecklistItem(checklistId:string){
        this.checklistItemService.add(
            this.checklistItemForm.getRawValue(),
            checklistId
            );


    }

    checklistAndItems$ = this.route.paramMap.pipe(

        switchMap((params) =>  
combineLatest([      this.checklistService.getChecklistById(params.get('id')as string).pipe(filter((checklist): checklist is Checklist => !!checklist)),
        this.checklistItemService.getItemsbyChecklistId(params.get('id')as string
             ),
                ])
             )
    
        );


        formModalIsOpen$ = new BehaviorSubject<boolean>(false);

                vm$ = combineLatest([this.checklistAndItems$, this.formModalIsOpen$]).pipe(map(([[checklist,items], formModalIsOpen])=> ({checklist, items, formModalIsOpen, }))
);

        checklistItemForm = this.fb.nonNullable.group({ title: ['',Validators.required],
        }
        );

        toggleChecklistItem(itemId: string){
            this.checklistItemService.toggle(itemId);

        }


        resetChecklistItems(checklistId:string){
        this.checklistItemService.reset(checklistId);


        }

}

@NgModule({
    imports:[
        CommonModule,
        IonicModule,
        FormModalComponentModule,
        ChecklistItemListComponentModule,
        RouterModule.forChild([
            {
                path:'',
                component:ChecklistComponent,

            },
        
        
        ]),

    ],
    declarations: [ChecklistComponent],
})


export class ChecklistComponentModule{}









