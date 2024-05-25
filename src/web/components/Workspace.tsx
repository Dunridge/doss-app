import { useEffect, useState } from 'react';
import { IWorkspaceProps } from '../utils/interfaces/IWorkspaceProps';
import DosspaceApi from '../api';
import { IWorkspace } from '../utils/interfaces/IWorkspace';
import { IShipmentTable } from '../utils/interfaces/IShipmentTable';
import ShipmentTable from './ShipmentTable';
import { IShipment } from '../utils/interfaces/IShipment';

export default function Workspace({ id, title, buildShipments }: IWorkspaceProps) {
    const [workspace, setWorkspace] = useState<IWorkspace>({ id, title, buildShipments } as IWorkspace);

    const updateWorkspace = async () => {
    }

    return (
        <div className="WorkspaceList__workspaceCard">
            <div className="WorkspaceList__title">
                <span className='WorkspaceList__titleText'>Title:</span>
                <span className='WorkspaceList__titleValue'>{title}</span>
            </div>
            <div className="WorkspaceList__table">
                <div className="WorkspaceList__tableHeader">Build Shipments Table</div>
                <div className="WorkspaceList__tableBody">
                    {workspace?.buildShipments?.map((shipmentTable) => <ShipmentTable key={shipmentTable.id} {...shipmentTable} />)}
                </div>
                <button onClick={updateWorkspace}>Add Shipment</button>
            </div>
        </div>
    );
}