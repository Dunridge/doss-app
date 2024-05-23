import { IShipmentTableProps } from "../utils/interfaces/IShipmentTableProps";
import Shipment from "./Shipment";

export default function ShipmentTable({ buildNumber, id, shipments }: IShipmentTableProps) {

    return (
        <div className="ShipmentTable">
            <div className="ShipmentTable__headerRow">
                <div>Build number: {buildNumber}</div>
                <span>---</span>
                <div>id: {id}</div>
            </div>

            <div className="ShipmentTable__shipments">
                <div className="ShipmentTable__shipmentsHeader">Shipments</div>
                {shipments.map((shipment) => <Shipment key={shipment.id} {...shipment} />)}
            </div>
        </div>
    )
}