export interface Tap {
  id: number,
  name: string,
  position: {
    lat: number,
    lng: number
  }
  rating?: number
}
