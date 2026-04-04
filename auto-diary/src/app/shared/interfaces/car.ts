export interface Car {
    _id: string;
    make: string;
    model: string;
    year: number;
    initialMileage: number;
    fuelType: 'benzin' | 'diesel' | 'hybrid' | 'electric' | 'gas';
    ownerId: string;
}
