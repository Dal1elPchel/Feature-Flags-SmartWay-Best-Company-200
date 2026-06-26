import styles from "./Textarea.module.scss";

interface TextareaProps {
    name: string;
    placeHolder: string;
    value?: string;
    onChange: (value: string) => void;
    isRequired: boolean;
    rows?: number;
    maxLength?:number;
}

const Textarea = ({name, placeHolder, value = "",
                   onChange = () => {}, isRequired = true,
               rows = 5, maxLength = 120}: TextareaProps) => {
    return (
        <textarea className={styles.textarea}
               name={name}
               id={name}
               placeholder={placeHolder}
               value={value}
               required={isRequired}
               onChange={(e) => onChange(e.target.value)}
               rows={rows}
               maxLength={maxLength}/>
    );
}

export default Textarea;