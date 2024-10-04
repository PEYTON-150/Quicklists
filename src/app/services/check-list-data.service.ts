import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Checklist } from '../interfaces/checklists';
import { filter , map , take , shareReplay , tap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {


  private checklists$ = new BehaviorSubject<Checklist[]>([]);

  private sharedChecklists$: Observable<Checklist[]>= this.checklists$.pipe(tap((checklists) => this.storageService.saveChecklists(checklists)), 
  shareReplay(1)
  
  );

  getChecklists() {


    return this.sharedChecklists$;
  }
  
  getChecklistById(id:string){
    return this.getChecklists().pipe(
      filter((checklists)=> checklists.length>0),
      map((checklists)=> checklists.find(checklist => checklist.id===id))
    );


  }

  constructor(private storageService: StorageService){}
        load(){
          this.storageService.loadChecklists$.pipe(take(1)).subscribe((checklists)=> {
            this.checklists$.next(checklists);
          });

          }

         



  add(checklist:Pick<Checklist,'title'>){
    const newChecklist ={
      ...checklist,
      id:this.generateSlug(checklist.title),

    };
    this.checklists$.next([...this.checklists$.value, newChecklist]);
  }


  private generateSlug(title:string){
    let slug = title.toLowerCase().replace(/\s+/g,"-");

    const matchingSlugs = this.checklists$.value.find(
      (checklist) => checklist.id ===slug
    );

      if(matchingSlugs) {

        slug = slug + Date.now().toString();
      }
      return slug;
  }
 
}
