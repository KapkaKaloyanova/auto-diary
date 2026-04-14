export interface FuelRecord {
    _id: string;
    date: string;
    mileage: number;
    liters: number;
    unitPrice: number;
    price: number;
    carId: string;
    roadType: 'градско' | 'магистрала' | 'offroad' ;
    gasStation: string;
    comment: string;
}
