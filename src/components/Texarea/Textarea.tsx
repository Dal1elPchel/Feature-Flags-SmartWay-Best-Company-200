import styles from "./Textarea.module.scss";
import {forwardRef, TextareaHTMLAttributes} from "react";


interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    rows?: number;
}

const Textarea =
    forwardRef<HTMLTextAreaElement, TextareaProps>(({
               rows = 5, ...rest}, ref) => {
    return (
        <textarea className={styles.textarea}
               ref={ref}
               rows={rows}
               {...rest}
        />
    );
});

export default Textarea;