export interface FuelRecord {
    _id: string;
    date: string;
    mileage: number;
    liters: number;
    price: number;
    carId: string;
    roadType: 'city' | 'highway' | 'offroad' ;
}
