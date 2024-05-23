import { useEffect } from 'react';
import { IWorkspaceProps } from '../utils/interfaces/IWorkspaceProps';
import DosspaceApi from '../api';
import { IWorkspace } from '../utils/interfaces/IWorkspace';

export default function Workspace({ id, title }: IWorkspaceProps) {

    useEffect(() => {
        fetchWorkspace(id);
    }, [id]);

    const fetchWorkspace = async (workspaceId: string) => {
        const workspace: IWorkspace = await DosspaceApi.getWorkspace(workspaceId);
        debugger;
    }

    return (
        <div className="WorkspaceList__workspaceCard">
          { title }
        </div>
    );
}