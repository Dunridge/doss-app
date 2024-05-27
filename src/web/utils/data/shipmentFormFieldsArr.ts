import { IShipmentInput } from "../interfaces/IShipmentInput";

export const shipmentFormFieldsArr: IShipmentInput[] = [
    {
        keyStr: 'description',
        name: 'Description'
    },
    {
        keyStr: 'orderNumber',
        name: 'Order number'
    },
    {
        keyStr: 'cost',
        name: 'Cost',
        type: 'number'
    },
]