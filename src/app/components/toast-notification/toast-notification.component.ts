import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { NgClass } from '@angular/common';
import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';

interface Toast {
  message: string;
  class: string;
  timeoutId?: any;
}

@Component({
  selector: 'app-toast-notification',
  standalone: true,
  imports: [NgClass],
  animations: [
    trigger('showState', [
      transition(':enter', [
        style({ transform: 'translateY(100px)' }),
        animate('.15s', style({  transform: 'translateY(0px)' })),
      ]),
      transition(':leave', [
        animate('.15s', style({  transform: 'translateY(100px)' }))
      ])
    ]),
  ],
  templateUrl: './toast-notification.component.html',
  styleUrl: './toast-notification.component.css'
})
export class ToastNotificationComponent {
  toasts: Toast[] = [];
  state: string = 'closed';

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.getToast().subscribe(toast => {
      if(toast){
        this.state = 'open';
        this.addToast(toast.message, toast.duration, toast.type);
      }
    });
  }

  addToast(message: string, duration: number, toastClass: string) {
    const toast: Toast = { message, class: toastClass };

    toast.class += ' show'; // Adiciona a classe de animação para exibir
    this.toasts.push(toast);
    toast.timeoutId = setTimeout(() => {
      this.state = 'closed';
      toast.class = toast.class.replace('show', '');
      this.removeToast(toast);
    }, duration);
  }

  removeToast(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
    clearTimeout(toast.timeoutId);
  }
}
