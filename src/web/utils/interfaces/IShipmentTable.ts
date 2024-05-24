import { IShipment } from './IShipment'

export interface IShipmentTable {
  id: string
  buildNumber: string 
  shipments: IShipment[]
}
