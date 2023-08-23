export interface Tap {
  _id: number,
  address: string,
  position: {
    lat: number,
    lng: number
  }
  rating?: number
}
