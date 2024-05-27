import { useEffect, useState } from 'react';
import DosspaceApi from '../api';
import '../style/WorkspaceList.css';
import { HomepageWorkspace } from '../utils/interfaces/HomepageWorkspace';
import { IWorkspace } from '../utils/interfaces/IWorkspace';
import { Workspace as IBEWorkspace } from '../../api/types';
import Workspace from './Workspace';
import { IWorkspaceForm } from '../utils/interfaces/IWorkspaceForm';
import ShipmentInput from './ShipmentInput';
import WorkspaceInput from './WorkspaceInput';

export default function WorkspaceList() {
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);

  const [workspaceForm, setWworkspaceForm] = useState<IWorkspaceForm>({ title: '' });

  useEffect(() => {
    initializeWorkspaces();
  }, []);

  const initializeWorkspaces = () => {
    fetchWorkspaces().then(async (workspacesArr: IBEWorkspace[]) => {
      console.log(workspacesArr);
      debugger;
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

  const handleCreateNewWorkspace = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(workspaceForm);
    const { title } = workspaceForm;

    // TODO: modify this bit to update the name of the workspace on the BE
    createNewWorkspace().then((newWorkspace: IWorkspace | undefined) => {
      // const castWorkspace = newWorkspace as IWorkspace;
      if (!!newWorkspace) {
        newWorkspace.title = title;
        debugger;
        // TODO: collect the form values here and pass them to the newWorkspace object
        // TODO: move the update workspace logic up the chain of componenets here 
        setWorkspaces([...workspaces, newWorkspace]);
      }
    });
  }

  const createNewWorkspace = async (): Promise<IWorkspace | undefined> => {
    try {
      const data: IWorkspace = await DosspaceApi.createWorkspace();
      debugger;

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

      <form onSubmit={handleCreateNewWorkspace}>
        <WorkspaceInput name="Workspace title" keyStr="title" form={workspaceForm} setForm={setWworkspaceForm} />

        <button type='submit'>Create new workspace</button>
      </form>

    </div>
  )
}
