import { useEffect, useState } from 'react';
import { IWorkspaceProps } from '../utils/interfaces/IWorkspaceProps';
import DosspaceApi from '../api';
import { IWorkspace } from '../utils/interfaces/IWorkspace';
import { IShipmentTable } from '../utils/interfaces/IShipmentTable';
import ShipmentTable from './ShipmentTable';
import { IShipment } from '../utils/interfaces/IShipment';

export default function Workspace({ id, title, buildShipments }: IWorkspaceProps) {
    const [workspace, setWorkspace] = useState<IWorkspace>({ id, title, buildShipments } as IWorkspace);

    const handleAddShipment = () => {
        const newShipment: IShipment = {
            id: Date.now().toString(),
            description: 'New Shipment',
            orderNumber: '123456',
            cost: 100
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

        updateWorkspace(id, postObj);
    }

    const updateWorkspace = async (workspaceId: string, updatedWorkspaceData: any) => {
        try {
            const data: IWorkspace = await DosspaceApi.updateWorkspace(workspaceId, updatedWorkspaceData);
            console.log('Updated workspace:', data);
            debugger;
            // TODO: fix this update
            setWorkspace(data);
        } catch (error) {
            console.error('Error updating the workspace:', error);
        }
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
                    {workspace?.buildShipments?.map((shipmentTable: IShipmentTable) => <ShipmentTable key={shipmentTable.id} {...shipmentTable} />)}
                </div>
                <button onClick={handleAddShipment}>Add Shipment</button>
            </div>
        </div>
    );
}