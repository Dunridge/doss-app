import { TextOrNumberInputType } from "../types/TextOrNumberInputType";
import { IShipmentForm } from "./IShipmentForm";

export interface IShipmentInputProps {
    keyStr: string;
    name: string;
    form: IShipmentForm;
    setForm: React.Dispatch<React.SetStateAction<IShipmentForm>>;
    type?: TextOrNumberInputType;
}