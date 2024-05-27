import { TextOrNumberInputType } from "../types/TextOrNumberInputType";

export interface IShipmentInput {
    keyStr: string;
    name: string;
    type?: TextOrNumberInputType;
}