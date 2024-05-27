import { IShipmentInput } from '../interfaces/IShipmentInput'

export const shipmentFormFieldsArr: IShipmentInput[] = [
  {
    keyStr: 'orderNumber',
    name: 'Order number',
    pattern: '^\\d{3}-\\d{7}-\\d{7}$',
    tooltip: '121-5821131-5985042',
  },
  {
    keyStr: 'description',
    name: 'Description',
    pattern: '\\d+ units',
    tooltip: '64 units',
  },
  {
    keyStr: 'cost',
    name: 'Cost',
    type: 'number',
    tooltip: '107643',
  },
]
