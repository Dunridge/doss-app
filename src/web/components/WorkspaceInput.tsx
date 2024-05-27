import { IWorkspapceInputProps } from "../utils/interfaces/IWorkspaceInputProps";

export default function WorkspaceInput({ name, keyStr, form, setForm }: IWorkspapceInputProps) {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setForm({ ...form, [keyStr]: inputValue });
    }

    return (
        <div className="WorkspaceInput">
            <div className="WorkspaceInput__label">{ name }</div>
            <input type="text" onChange={handleInputChange} className="WorkspaceInput__input" value={form[keyStr]} />
        </div>
    );
}