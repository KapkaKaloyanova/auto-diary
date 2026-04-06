import { Injectable } from '@angular/core';
import { Notification } from '../../shared/interfaces/notification';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>(); // каналът по който изпращаме съобщения

  notifications$ = this.notificationSubject.asObservable(); // слушателят, компонентът се абонира за него и чака съобщения

  show(notification: Notification): void {
    this.notificationSubject.next({
      duration: 3000, // тук задаваме дефолтна стойност на duration
      ...notification
    }) // с това се излъчва notification към всички абонати на notifications$
  }

  success(message: string) {
    this.show({ type: 'success', message });
  }

  error(message:string){
    this.show({type: 'error', message, duration: 5000});
  }

  warning(message:string){
    this.show({type: 'warning', message});
  }

  info(message:string){
    this.show({type: 'info', message})
  }
}
