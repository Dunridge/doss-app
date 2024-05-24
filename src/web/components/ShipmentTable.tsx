import { IShipmentTableProps } from "../utils/interfaces/IShipmentTableProps";
import Shipment from "./Shipment";
import "../style/ShipmentTable.css";

export default function ShipmentTable({ buildNumber, id, shipments }: IShipmentTableProps) {

    return (
        <div className="ShipmentTable">
            <div className="ShipmentTable__headerRow">
                <div>Build number: {buildNumber}</div>
                <div>ID: {id}</div>
            </div>

            <div className="ShipmentTable__shipments">
                <div className="ShipmentTable__shipmentsHeader">Shipments</div>
                <table className="ShipmentTable__shipmentsTable">
                    <thead>
                        <tr>
                            <th>Order #</th>
                            <th>Description</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {shipments.map((shipment) => <Shipment key={shipment.id} {...shipment} />)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}