import { IWorkspaceForm } from './IWorkspaceForm'

export interface IWorkspapceInputProps {
  keyStr: string
  name: string
  form: IWorkspaceForm
  setForm: React.Dispatch<React.SetStateAction<IWorkspaceForm>>
}
