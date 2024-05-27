import { IShipmentTableProps } from "../utils/interfaces/IShipmentTableProps";
import Shipment from "./Shipment";
import "../style/ShipmentTable.css";
import { shipmentFormFieldsArr } from "../utils/data/shipmentFormFieldsArr";
import { IShipmentInput } from "../utils/interfaces/IShipmentInput";
import ShipmentInput from "./ShipmentInput";
import { useState } from "react";
import { IShipmentForm } from "../utils/interfaces/IShipmentForm";
import { IShipment } from "../utils/interfaces/IShipment";
import { IWorkspace } from "../utils/interfaces/IWorkspace";
import { toast, ToastContainer } from "react-toastify"

export default function ShipmentTable({ buildNumber, id, shipments, workspace, setWorkspace, updateWorkspace }: IShipmentTableProps) {
    const [shipmentForm, setShipmentForm] = useState<IShipmentForm>({ cost: '', description: '', orderNumber: '' });

    const handleAddShipment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newShipment: IShipment = {
            id: Date.now().toString(),
            description: shipmentForm.description,
            orderNumber: shipmentForm.orderNumber,
            cost: +shipmentForm.cost
        };

        const buildShipmentsCopy = [...workspace.buildShipments];
        const buildShipmentIndex = buildShipmentsCopy.findIndex(bs => bs.id === id);

        if (buildShipmentIndex !== -1) {
            buildShipmentsCopy[buildShipmentIndex] = {
                ...buildShipmentsCopy[buildShipmentIndex],
                shipments: [...buildShipmentsCopy[buildShipmentIndex].shipments, newShipment]
            };
        } else {
            buildShipmentsCopy.push({
                id: Date.now().toString(),
                buildNumber: buildNumber,
                shipments: [newShipment]
            });
        }

        const updatedWorkspace: IWorkspace = {
            ...workspace,
            buildShipments: buildShipmentsCopy
        };

        const postObj = {
            workspace: updatedWorkspace
        };

        updateWorkspace(id, postObj).then((resWorkspace: IWorkspace | undefined) => {
            if (resWorkspace) {
                setWorkspace(resWorkspace);
            }
            setShipmentForm({ cost: '', description: '', orderNumber: '' });
            toast.success("Shipment added successfully");
        });
    }

    return (
        <div className="ShipmentTable">
            <div className="ShipmentTable__tableHeader">
                <span>Build Shipments Table</span>
            </div>
            
            <div className="ShipmentTable__headerRow">
                <div>Build number: {buildNumber}</div>
                <div>ID: {id}</div>
            </div>

            {
                shipments?.length === 0 ? (
                    <div className="ShipmentTable__noShipments">
                        <span>No Shipments</span>
                    </div>
                ) : (
                    <div className="ShipmentTable__shipments">
                        <div className="ShipmentTable__shipmentsHeader">Shipments</div>
                        <table className="ShipmentTable__shipmentsTable">
                            <thead className="ShipmentTable__shipmentsTableHead">
                                <tr className="ShipmentTable__shipmentsTableHeadRow">
                                    <th>Order #</th>
                                    <th>Description</th>
                                    <th>Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shipments?.map((shipment) => <Shipment key={shipment?.id} {...shipment} />)}
                            </tbody>
                        </table>
                    </div>
                )
            }

            <div className="ShipmentTable__formContainer">
                {/* TODO: rename these classNames and copy the styles  */}
                <form className="WorkspaceList__form" action="" onSubmit={handleAddShipment}>
                    <div className="WorkspaceList__form-fields">
                        {shipmentFormFieldsArr?.map((shipmentInput: IShipmentInput) => (<ShipmentInput key={shipmentInput.keyStr} form={shipmentForm} setForm={setShipmentForm} name={shipmentInput.name} keyStr={shipmentInput.keyStr} type={shipmentInput.type} pattern={shipmentInput.pattern} tooltip={shipmentInput.tooltip} />))}
                    </div>
                    <button className="WorkspaceList__submit" type='submit'>Add Shipment</button>
                </form>
            </div>
        </div>
    )
}