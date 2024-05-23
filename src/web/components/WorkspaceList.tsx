import { useEffect, useState } from 'react';
import DosspaceApi from '../api';
import '../style/WorkspaceList.css';
import { HomepageWorkspace } from '../utils/interfaces/HomepageWorkspace';
import Workspace from './Workspace';

export default function WorkspaceList() {
  const [workspaces, setWorkspaces] = useState<HomepageWorkspace[]>([]);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    const workspaces = await DosspaceApi.getWorkspaces();
    setWorkspaces(workspaces);
  }

  return (
    <div className="WorkspaceList">
      <h1 className="WorkspaceList__header">All workspaces</h1>
      {workspaces.map((workspace) => (
        <Workspace key={workspace.id} id={workspace.id} title={workspace.title} />
      ))}
    </div>
  )
}
