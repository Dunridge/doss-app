import { IShipmentInputProps } from '../utils/interfaces/IShipmentInputProps'
import '../style/ShipmentInput.css'

export default function ShipmentInput({
  name,
  keyStr,
  form,
  setForm,
  pattern,
  type = 'text',
  tooltip,
}: IShipmentInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue: string | number = e.target.value

    if (!isNaN(parseFloat(inputValue)) && isFinite(+inputValue)) {
      inputValue = parseFloat(inputValue)
      if (inputValue < 0) {
        inputValue = 0
      }
    } else {
      inputValue = e.target.value
    }

    setForm({ ...form, [keyStr]: inputValue.toString() })
  }

  return (
    <div className="ShipmentInput">
      <div className="ShipmentInput__label-container">
        <div className="ShipmentInput__label">{name}</div>
        {!!tooltip && <div className="ShipmentInput__tooltip">Example: {tooltip}</div>}
      </div>
      <input
        required
        type={type}
        pattern={pattern}
        onChange={handleInputChange}
        className="ShipmentInput__input"
        value={form[keyStr]}
      />
    </div>
  )
}
