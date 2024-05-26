import { useEffect, useState } from 'react';
import DosspaceApi from '../api';
import '../style/WorkspaceList.css';
import { HomepageWorkspace } from '../utils/interfaces/HomepageWorkspace';
import { IWorkspace } from '../utils/interfaces/IWorkspace';
import { Workspace as IBEWorkspace } from '../../api/types';
import Workspace from './Workspace';

export default function WorkspaceList() {
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);

  useEffect(() => {
    initializeWorkspaces();
  }, []);

  const initializeWorkspaces = () => {
    fetchWorkspaces().then(async (workspacesArr: IBEWorkspace[]) => {
      console.log(workspacesArr);
      const workspacePromises: Promise<IWorkspace>[] = await workspacesArr?.map(async (workspace) => {
        const { id } = workspace;
        const resWorkspace = await fetchWorkspace(id);

        return resWorkspace;
      })
      const updatedWorkspaces = await Promise.all(workspacePromises);
      debugger;
      setWorkspaces(updatedWorkspaces);
    });
  }

  const fetchWorkspaces = async () => {
    const workspaces = await DosspaceApi.getWorkspaces();

    return workspaces;
  }

  const fetchWorkspace = async (workspaceId: string) => {
    const workspace: IWorkspace = await DosspaceApi.getWorkspace(workspaceId);

    return workspace;
  }

  const handleCreateNewWorkspace = async () => {
    createNewWorkspace().then((newWorkspace: any) => {
      setWorkspaces([...workspaces, newWorkspace]);
    });
  }

  const createNewWorkspace = async () => {
    try {
      const data: IWorkspace = await DosspaceApi.createWorkspace();
      
      return data;
    } catch (error) {
      console.error('Error updating the workspace:', error);
    }
  }

  return (
    <div className="WorkspaceList">
      <h1 className="WorkspaceList__header">All workspaces</h1>

      <div className="WorkspaceList__workspaces">
        {workspaces.map((workspace) => (
          <Workspace key={workspace?.id} id={workspace?.id} title={workspace?.title} buildShipments={workspace?.buildShipments} />
        ))}
      </div>
      <button onClick={handleCreateNewWorkspace}>Create new workspace</button>
    </div>
  )
}
