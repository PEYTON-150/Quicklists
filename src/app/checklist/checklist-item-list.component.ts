import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, NgModule, Output, EventEmitter } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { ChecklistItem } from "../interfaces/checklist-item";
import { NgModel } from "@angular/forms";


@Component({
        selector: 'app-checklist-item-list',
        template:
        `<ion-list lines="none">
        <ion-item *ngFor="let item of checklistItems; trackByFn" (click)="toggle.emit(item.id)">
        <ion-label>{{ item.title }}</ion-label>
        <ion-checkbox slot="end" [checked] ="item.checked"> </ion-checkbox>


        
        </ion-item>
        
        
        </ion-list>`,
        changeDetection: ChangeDetectionStrategy.OnPush
})


export class ChecklistItemListComponent {
    @Input() checklistItems!: ChecklistItem[];
    @Output() toggle = new EventEmitter<string>();
    trackByFn(index: number, item: ChecklistItem){
        return item.id;
    }

}

@NgModule({
    imports: [CommonModule, IonicModule],
    declarations: [ChecklistItemListComponent],
    exports: [ChecklistItemListComponent],
})

export class ChecklistItemListComponentModule{}

