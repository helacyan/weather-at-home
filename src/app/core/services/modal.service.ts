import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ModalService {


  private display: any  = new BehaviorSubject('close');
  status: boolean = false;

  watch(): Observable<'open' | 'close'> {
    return this.display.asObservable();
  }

  open() {
    this.display.next('open');
    this.status = true
  }

  close() {
    this.display.next('close');
    this.status = false
  }
}
