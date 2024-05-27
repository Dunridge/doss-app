import { TextOrNumberInputType } from '../types/TextOrNumberInputType'
import { IShipmentForm } from './IShipmentForm'
import { IShipmentInput } from './IShipmentInput'

export interface IShipmentInputProps extends IShipmentInput {
  form: IShipmentForm
  setForm: React.Dispatch<React.SetStateAction<IShipmentForm>>

  // keyStr: string;
  // name: string;
  // pattern?: string;
  // type?: TextOrNumberInputType;
}
