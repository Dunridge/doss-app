import { IShipment } from './IShipment'

export interface IShipmentForm {
  description: string
  orderNumber: string
  cost: string;
  [key: string]: string;
}
