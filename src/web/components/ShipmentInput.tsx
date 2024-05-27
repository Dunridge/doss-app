import { IShipmentInputProps } from "../utils/interfaces/IShipmentInputProps";

export default function ShipmentInput({ name, keyStr, form, setForm }: IShipmentInputProps) {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setForm({ ...form, [keyStr]: inputValue });
    }

    return (
        <div className="ShipmentInput">
            <div className="ShipmentInput__label">{ name }</div>
            <input type="text" onChange={handleInputChange} className="ShipmentInput__input" value={form[keyStr]} />
        </div>
    );
}