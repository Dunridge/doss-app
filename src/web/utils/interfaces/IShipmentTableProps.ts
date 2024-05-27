import { IShipmentTable } from './IShipmentTable'
import { IWorkspace } from './IWorkspace'

export interface IShipmentTableProps extends IShipmentTable {
  workspace: IWorkspace
  setWorkspace: React.Dispatch<React.SetStateAction<IWorkspace>>
  updateWorkspace: (
    workspaceId: string,
    updatedWorkspaceData: any
  ) => Promise<IWorkspace | undefined>
}
