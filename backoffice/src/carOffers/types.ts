export interface Equipment {
    id: number;
    name: string;
}

export interface AddCarOfferParams {
    title: string;
    description: string | null;
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
    equipments: string | null;
}

export interface CarOffer extends AddCarOfferParams {
    id: number;
    creationDateUnix: number;
    authorId: number;
    sold: boolean;
}

export interface AddCarOfferForm {
    formTitle: string;
    formDescription?: string;
    formPriceInEuros: string;
    formManufacturer: string;
    formModel: string;
    formYear: string;
    formMileageInKm: string;
    formFuelType: string;
    formGearboxType: string;
    formCarType: string;
    formColor: string;
    formNumberOfDoors: string;
    formNumberOfSeats: string;
    formTaxHorsePower: string;
    formHorsePower: string;
    formEquipments?: string[];
}

export interface AddCarOfferResponse {
    carOfferId: number;
}

export interface UploadFilesParams {
    carOfferId: number;
}
