export interface OpeningHour {
    id: number;
    dayOfWeek: 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi' | 'Dimanche';
    openingTime: string | null;
    closingTime: string | null;
    breakStartTime: string | null;
    breakEndTime: string | null;
}
