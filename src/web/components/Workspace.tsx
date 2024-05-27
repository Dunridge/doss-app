import { useState } from 'react';
import DosspaceApi from '../api';
import { shipmentFormFieldsArr } from '../utils/data/shipmentFormFieldsArr';
import { IShipment } from '../utils/interfaces/IShipment';
import { IShipmentForm } from '../utils/interfaces/IShipmentForm';
import { IShipmentInput } from '../utils/interfaces/IShipmentInput';
import { IShipmentTable } from '../utils/interfaces/IShipmentTable';
import { IWorkspace } from '../utils/interfaces/IWorkspace';
import { IWorkspaceProps } from '../utils/interfaces/IWorkspaceProps';
import ShipmentInput from './ShipmentInput';
import ShipmentTable from './ShipmentTable';

export default function Workspace({ id, title, buildShipments, updateWorkspace }: IWorkspaceProps) {
    const [workspace, setWorkspace] = useState<IWorkspace>({ id, title, buildShipments } as IWorkspace);
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

        if (buildShipmentsCopy.length > 0) {
            buildShipmentsCopy[0] = {
                ...buildShipmentsCopy[0],
                shipments: [...buildShipmentsCopy[0].shipments, newShipment]
            };
        } else {
            buildShipmentsCopy.push({
                id: Date.now().toString(),
                buildNumber: 'A82D2-108',
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
        });
    }

    return (
        <div className="WorkspaceList__workspaceCard">
            <div className="WorkspaceList__title">
                <span className='WorkspaceList__titleText'>Workspace:</span>
                <span className='WorkspaceList__titleValue'>{title}</span>
            </div>
            <div className="WorkspaceList__table">
                <div className="WorkspaceList__tableHeader">Build Shipments Table</div>
                <div className="WorkspaceList__tableBody">
                    {workspace?.buildShipments?.map((shipmentTable: IShipmentTable) => <ShipmentTable key={shipmentTable.id} {...shipmentTable} />)}
                </div>

                <form className="WorkspaceList__form" action="" onSubmit={handleAddShipment}>
                    <div className="WorkspaceList__form-fields">
                        { shipmentFormFieldsArr?.map((shipmentInput: IShipmentInput) => (<ShipmentInput key={shipmentInput.keyStr} form={shipmentForm} setForm={setShipmentForm} name={shipmentInput.name} keyStr={shipmentInput.keyStr} type={shipmentInput.type} pattern={shipmentInput.pattern}/>))}
                    </div>
                    <button className="WorkspaceList__submit" type='submit'>Add Shipment</button>
                </form>
            </div>
        </div>
    );
}