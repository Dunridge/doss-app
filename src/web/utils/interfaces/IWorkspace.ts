import { IShipmentTable } from './IShipmentTable'

export interface IWorkspace {
  id: string
  title: string
  buildShipments: IShipmentTable[]
}
