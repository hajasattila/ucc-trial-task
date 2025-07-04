import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalComponentName = new BehaviorSubject<string | null>(null);

  modal$ = this.modalComponentName.asObservable();

  open(componentName: string) {
    this.modalComponentName.next(componentName);
  }

  close() {
    this.modalComponentName.next(null);
  }
}
