export interface CoordinatesType {
    latitude: number;
    longitude: number;
    accuracy?: number | null;
    altitudeAccuracy?: number | null;
    heading?: number | null;
    speed?: number | null
}