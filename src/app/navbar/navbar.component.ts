import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html'
})

export class NavbarComponent {
    @Output() onHideModal = new EventEmitter();

    
    onHideDialog() {
        this.onHideModal.emit();
    }
}