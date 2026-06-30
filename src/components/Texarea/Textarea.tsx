import styles from "./Textarea.module.scss";
import {forwardRef, TextareaHTMLAttributes} from "react";


interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    rows?: number;
    maxLength?: number;
}

const Textarea =
    forwardRef<HTMLTextAreaElement, TextareaProps>(({
               rows = 5, maxLength = 120, ...rest}, ref) => {
    return (
        <textarea className={styles.textarea}
               ref={ref}
               rows={rows}
               maxLength={maxLength}
               {...rest}
        />
    );
});

export default Textarea;