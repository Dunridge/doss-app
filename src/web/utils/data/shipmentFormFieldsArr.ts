import { IShipmentInput } from "../interfaces/IShipmentInput";

export const shipmentFormFieldsArr: IShipmentInput[] = [
    {
        keyStr: 'orderNumber',
        name: 'Order number',
        pattern: '^\\d{3}-\\d{7}-\\d{7}$'
    },
    {
        keyStr: 'description',
        name: 'Description',
        pattern: '\\d+ units'
    },
    {
        keyStr: 'cost',
        name: 'Cost',
        type: 'number',
        // pattern: '/^\d{3}-\d{7}-\d{7}$/'
    },
]