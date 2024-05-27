import { useState } from 'react';
import { IShipmentTable } from '../utils/interfaces/IShipmentTable';
import { IWorkspace } from '../utils/interfaces/IWorkspace';
import { IWorkspaceProps } from '../utils/interfaces/IWorkspaceProps';
import ShipmentTable from './ShipmentTable';

export default function Workspace({ id, title, buildShipments, updateWorkspace }: IWorkspaceProps) {
    const [workspace, setWorkspace] = useState<IWorkspace>({ id, title, buildShipments } as IWorkspace);

    const handleAddShipmentTable = () => {
        // TODO: update the workspace to have another build
        debugger;
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
                    {workspace?.buildShipments?.map((shipmentTable: IShipmentTable) => <ShipmentTable key={shipmentTable.id} {...shipmentTable} workspace={workspace} setWorkspace={setWorkspace} updateWorkspace={updateWorkspace}/>)}
                </div>
                <button className="WorkspaceList__submit" onClick={handleAddShipmentTable}>Add Shipment Table</button>
            </div>
        </div>
    );
}