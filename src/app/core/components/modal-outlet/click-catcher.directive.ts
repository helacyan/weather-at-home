import { Directive, ElementRef, HostListener } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Directive({selector: '[clickCatcher]'})
export class ClickCatcher {

  constructor(
    private modalService: ModalService,
) {}

  @HostListener('window:keydown.escape', ['$event.target.id'])
  handleKeyDown(event: KeyboardEvent) {
    this.modalService.status ?  this.modalService.close() : null
  }

}
