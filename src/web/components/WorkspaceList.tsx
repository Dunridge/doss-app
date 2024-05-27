import { useEffect, useState } from 'react';
import { Workspace as IBEWorkspace } from '../../api/types';
import DosspaceApi from '../api';
import '../style/WorkspaceList.css';
import { IWorkspace } from '../utils/interfaces/IWorkspace';
import { IWorkspaceForm } from '../utils/interfaces/IWorkspaceForm';
import Workspace from './Workspace';
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

      const workspaceId = newWorkspace?.id!;
      debugger;
      // TODO: here call the update workspace API and update the name 

      if (!!newWorkspace) {
        const updatedWorkspace: IWorkspace = {
          ...newWorkspace,
          title: title
        }
        const postObj = {
          workspace: updatedWorkspace
        };
        debugger;
        let resWorkspace: IWorkspace = {} as IWorkspace;
        debugger;
        updateWorkspace(workspaceId, postObj).then((data: IWorkspace | undefined) => {
          debugger;
          if (!!data) {
            resWorkspace = data;
            debugger;
          } 
        })

        console.log(resWorkspace);
        debugger;

        // const updatedWorkspace = updateWorkspace(workspaceId, workspaceToUpdate);
        // TODO: collect the form values here and pass them to the newWorkspace object
        // TODO: move the update workspace logic up the chain of componenets here 
        setWorkspaces([...workspaces, resWorkspace]);
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

  const updateWorkspace = async (workspaceId: string, updatedWorkspaceData: any) => {
    try {
        const data: IWorkspace = await DosspaceApi.updateWorkspace(workspaceId, updatedWorkspaceData);
        console.log('Updated workspace:', data);
        debugger;
        return data;
    } catch (error) {
        console.error('Error updating the workspace:', error);
        debugger;
    }
  }

  return (
    <div className="WorkspaceList">
      <h1 className="WorkspaceList__header">All workspaces</h1>

      <div className="WorkspaceList__workspaces">
        {workspaces.map((workspace) => (
          <Workspace updateWorkspace={updateWorkspace} key={workspace?.id} id={workspace?.id} title={workspace?.title} buildShipments={workspace?.buildShipments} />
        ))}
      </div>

      <form className='WorkspaceList__workspaceForm' onSubmit={handleCreateNewWorkspace}>
        <WorkspaceInput name="Workspace title" keyStr="title" form={workspaceForm} setForm={setWworkspaceForm} />

        <button className='WorkspaceList__submit' type='submit'>Create new workspace</button>
      </form>

    </div>
  )
}
