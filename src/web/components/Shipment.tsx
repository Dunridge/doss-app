import { IShipmentProps } from '../utils/interfaces/IShipmentProps'
import '../style/Shipment.css'

export default function Shipment({ cost, description, id, orderNumber }: IShipmentProps) {
  // TODO: see whether you can learn more by the ids from the api

  return (
    <tr className="Shipment">
      {/* <td>{ id }</td> */}
      <td>{orderNumber}</td>
      <td>{description}</td>
      <td>${cost}</td>
    </tr>
  )
}
