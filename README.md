Project Description: Customized Ionic Application In this project, you will develop a customized Ionic application with a unique color scheme and enhanced features to improve user experience. The goal is to style the application using CSS and incorporate functionality for managing checklists and items.

Objectives: Custom Color Scheme:

Use the Ionic Color Generator to create a personalized color palette. Implement the color scheme by updating the following files: src/theme/variables.css src/global.scss Add the following styles to your src/global.scss file:

:root { --ion-card-color: var(--ion-color-dark); } ion-app { } ion-content { ion-item-sliding { } } Set background colors for ion-app, ion-content, and ion-item-sliding using the defined variable names.

Enhance Components:

Home Component (home.component.ts): Color the ion-toolbar. Set the ion-content to fullscreen with [fullscreen]="true". Add a header element to ion-content:

Your lists
Checklist List Component (checklist-list.component.ts): Style the ion-item-sliding with the following properties:

ion-item-sliding { background-color: var(--ion-color-light); border-radius: 5px; margin: 10px 0 10px 10px; box-shadow: -2px 4px 4px 0px rgba(235, 68, 90, 0.1); overflow: visible; } ion-item-options { padding-right: 5px; } ion-label { font-size: 1.2em; font-weight: bold; color: var(--ion-color-dark); padding-top: 10px; padding-bottom: 10px; } ion-item { border-radius: 5px; border-left: 4px solid var(--ion-color-tertiary); padding-right: 5px; }

Checklist Component (checklist.component.ts): Modify the template to include a back button and add the following style to the header: ion-header { background-color: var(--ion-color-primary); }

Checklist Item List Component (checklist-item-list.component.ts): Style the ion-label: ion-label { font-weight: bold; margin: 20px; white-space: normal; } Form Modal Component (form-modal.component.ts): Add the following styles: ion-label { font-weight: bold; } form { padding: 1rem; } ion-input { background: var(--ion-color-light); --padding-start: 1rem !important; --padding-top: 1rem !important; --padding-bottom: 1rem !important; --padding-end: 1rem !important; } ion-button { margin-top: 1rem; width: 100%; } Delete Confirmation:

Implement a confirmation alert for deleting both checklists and checklist items in home.component.ts:

async deleteChecklist(id: string) { const alert = await this.alertCtrl.create({ header: 'Are you sure?', subHeader: 'This will also delete all of the items for this checklist', buttons: [ { text: 'Delete', cssClass: 'confirm-delete-button', role: 'destructive', handler: () => { this.checklistService.remove(id); }, }, { text: 'Cancel', cssClass: 'cancel-delete-button', role: 'cancel', }, ], }); alert.present(); } Inject Ionic's AlertController from the @ionic/angular library to enable the alert functionality. Additional Features:

Capture and display the creation date of each checklist in smaller, gray, italicized text at the end of the checklist. Allow the application to capture a description of each checklist, displaying it under the title or in a modal upon clicking an edit or delete button. Display an item count alongside the checklist name.

Summary This project aims to enhance your skills in styling and structuring an Ionic application while providing a rich user experience through customizable features and interactive elements.
