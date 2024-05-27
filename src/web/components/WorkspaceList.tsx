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

    try {
      const newWorkspace: IWorkspace | undefined = await createNewWorkspace();

      if (newWorkspace) {
        const workspaceId = newWorkspace.id;

        const updatedWorkspace: IWorkspace = {
          ...newWorkspace,
          title: title,
          buildShipments: newWorkspace.buildShipments.map((shipment) => ({
            ...shipment,
            buildNumber: generateBuildNumber()
          }))
        };

        const postObj = {
          workspace: updatedWorkspace
        };

        const resWorkspace = await updateWorkspace(workspaceId, postObj);

        if (resWorkspace) {
          setWorkspaces([...workspaces, resWorkspace]);
        }
      }
    } catch (error) {
      console.error('Error creating new workspace:', error);
    }
  };

  const generateBuildNumber = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const getRandomLetter = () => letters[Math.floor(Math.random() * letters.length)];
    const getRandomDigit = () => Math.floor(Math.random() * 10);

    const part1 = `${getRandomLetter()}${getRandomDigit()}${getRandomDigit()}${getRandomLetter()}${getRandomDigit()}`;
    const part2 = `${getRandomDigit()}${getRandomDigit()}${getRandomDigit()}`;

    return `${part1}-${part2}`;
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
          <Workspace updateWorkspace={updateWorkspace} key={workspace?.id} id={workspace?.id} title={workspace?.title} buildShipments={workspace?.buildShipments} generateBuildNumber={generateBuildNumber} />
        ))}
      </div>

      <form className='WorkspaceList__workspaceForm' onSubmit={handleCreateNewWorkspace}>
        <WorkspaceInput name="Workspace title" keyStr="title" form={workspaceForm} setForm={setWworkspaceForm} />

        <button className='WorkspaceList__submit' type='submit'>Create new workspace</button>
      </form>

    </div>
  )
}
