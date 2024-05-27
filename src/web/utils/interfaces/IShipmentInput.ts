import { TextOrNumberInputType } from "../types/TextOrNumberInputType";

export interface IShipmentInput {
    keyStr: string;
    name: string;
    pattern?: string;
    type?: TextOrNumberInputType;
    tooltip?: string;
}