export interface CarOffer {
    id: number;
    title: string;
    description?: string;
    priceInCents: number;
    manufacturer: string;
    model: string;
    year: number;
    mileageInKm: number;
    fuelType: string;
    gearboxType: string;
    carType: string;
    color: string;
    numberOfDoors: number;
    numberOfSeats: number;
    taxHorsePower: number;
    horsePower: number;
    equipments: string;
    creationDateUnix: number;
    authorId: number;
    sold: boolean;
}

export interface Equipment {
    id: number;
    name: string;
}
