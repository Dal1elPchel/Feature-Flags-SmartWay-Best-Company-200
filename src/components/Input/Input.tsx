import styles from "./Input.module.scss";

type InputType = "text" | "password";

interface InputProps {
    name: string;
    placeHolder: string;
    typeInput: InputType;
    value: string;
    onChange: (value: string) => void;
    isRequired: boolean;
}

const Input = ({name, placeHolder, typeInput, value = "",
               onChange = () => {}, isRequired = true}: InputProps) => {
    return (
        <input className={styles.inputElem}
        name={name}
        id={name}
        placeholder={placeHolder}
        type={typeInput}
        value={value}
        required={isRequired}
        onChange={(e) => onChange(e.target.value)}/>
    );
}

export default Input;