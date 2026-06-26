import styles from "./Input.module.scss";
import {InputHTMLAttributes, forwardRef} from "react";

type InputType = "text" | "password";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    typeInput: InputType;
}

const Input =
    forwardRef<HTMLInputElement, InputProps>(
        ({typeInput, ...rest}, ref) => {
    return (
        <input className={styles.inputElem}
        ref={ref}
        type={typeInput}
        {...rest}
        />
    );
});

Input.displayName = "Input";

export default Input;