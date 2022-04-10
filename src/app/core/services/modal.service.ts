import {Injectable} from '@angular/core';
import { Store } from '@ngrx/store';

import {BehaviorSubject, Observable} from 'rxjs';
import { watch, open, close, statusSelector } from 'src/app/reducers/modal';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private display: any  = new BehaviorSubject('close');

  constructor (
    private store: Store
  ) {}

  status$ = this.store.select(statusSelector)

  watch(): Observable<'open' | 'close'> {
    this.store.dispatch(watch())
    return this.display.asObservable();
  }

  open() {
    this.display.next('open');
    this.store.dispatch(open())
  }

  close() {
    this.display.next('close');
    this.store.dispatch(close())
  }
}
