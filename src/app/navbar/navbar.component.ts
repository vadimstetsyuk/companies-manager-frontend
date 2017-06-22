import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { AddCompanyComponent } from '../dialogs/add-dialog/add-dialog.component';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html'
})

export class NavbarComponent {
    @ViewChild('childModal') childModal: AddCompanyComponent;
    constructor(private viewContainerRef: ViewContainerRef) {
    }

}