import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Toast {
  message: string;
  duration: number;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new BehaviorSubject<Toast | null>(null);

  getToast(): Observable<Toast | null> {
    return this.toastSubject.asObservable();
  }

  open(message: string, duration: number, type: string) {
    this.toastSubject.next({ message, duration, type });
  }
}
