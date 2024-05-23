import { useEffect, useState } from 'react';
import { IWorkspaceProps } from '../utils/interfaces/IWorkspaceProps';
import DosspaceApi from '../api';
import { IWorkspace } from '../utils/interfaces/IWorkspace';
import { IShipmentTable } from '../utils/interfaces/IShipmentTable';
import ShipmentTable from './ShipmentTable';

export default function Workspace({ id, title }: IWorkspaceProps) {
    const [buildShipments, setBuildShipments] = useState<IShipmentTable[]>([]);

    useEffect(() => {
        const idIsDefined = id !== undefined;
        idIsDefined && fetchWorkspace(id);
    }, [id]);

    useEffect(() => {
        console.log(buildShipments);
    }, [buildShipments])

    const fetchWorkspace = async (workspaceId: string) => {
        const workspace: IWorkspace = await DosspaceApi.getWorkspace(workspaceId);
        const workspaceShipments = workspace.buildShipments;
        setBuildShipments(workspaceShipments);
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
                    {buildShipments.map((shipmentTable) => <ShipmentTable key={shipmentTable.id} {...shipmentTable} />)}
                </div>
            </div>
        </div>
    );
}