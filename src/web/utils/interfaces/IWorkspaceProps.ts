import { IWorkspace } from "./IWorkspace";

export interface IWorkspaceProps extends IWorkspace {
    updateWorkspace: (workspaceId: string, updatedWorkspaceData: any) => Promise<IWorkspace | undefined>;
    generateBuildNumber: () => string;
}