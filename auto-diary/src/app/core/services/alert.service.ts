import { inject, Injectable, signal } from '@angular/core';
import { ServiceRecordService } from './service-record.service';
import { forkJoin, map, Observable, of } from 'rxjs';
import { DocumentRecordService } from './document-record.service';
import { Car } from '../../shared/interfaces/car';
import { Alert } from '../../shared/interfaces/alert';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private serviceRecordService = inject(ServiceRecordService);
  private documentRecordService = inject(DocumentRecordService);
  
  dismissedAlerts = signal<string[]>([]);
  dismissAlert(index: string) {
    this.dismissedAlerts.update(dismissed => [...dismissed, index]);
  }

  getAlertsForCar(carId: string): Observable<Alert[]> {

    return forkJoin([
      this.serviceRecordService.getServiceRecordsById(carId),
      this.documentRecordService.getDocumentRecordsById(carId)
    ]).pipe(
      map(([serviceRecs, docRecs]) => {
        const today = new Date();
        const soon = new Date();
        soon.setDate(today.getDate() + 14); // Add 14 days to the current date
        const result: Alert[] = [];

        //Проверка на документи
        docRecs.forEach(doc => {
          if (doc.expiryDate) {
            const expiry = new Date(doc.expiryDate);
            if (expiry < today) {
              result.push({message: `⚠️ Документ "${doc.title}" е с изтекъл срок!`, carId: carId});
            } else if (expiry <= soon) {
              result.push({message: `🔔 Документ "${doc.title}" изтича на ${doc.expiryDate}!`, carId: carId});
            }
          }
        });
        //Проверка на сервизи
        serviceRecs.forEach(rec => {
          if (rec.nextServiceDate) {
            const nextService = new Date(rec.nextServiceDate);
            if (nextService < today) {
              result.push({ message: `⚠️ Сервиз "${rec.type}" е с изтекъл срок!`, carId: carId });
            } else if (nextService <= soon) {
              result.push({message:`🔔 Сервиз "${rec.type}" изтича на ${rec.nextServiceDate}!`, carId: carId});
            }
          }
        });

        return result.filter(alert =>
          !this.dismissedAlerts().includes(alert.message));
      })
    )

  }

  getAlertsForAllCars(cars: Car[]): Observable<Alert[]> {
    if (cars.length === 0) return of([]);

    return forkJoin(cars.map(car => this.getAlertsForCar(car._id)))
      .pipe(map(allAlerts => allAlerts.flat()));
  }
}


