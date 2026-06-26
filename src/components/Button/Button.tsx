import styles from "./Button.module.scss"
import {ReactNode} from "react";

interface ButtonProps {
    text: string | ReactNode;
    isAccent: boolean;
    onClick?: () => void;
    isSubmit: boolean;
    className?: string;
}

const Button =
    ({text, isAccent, onClick, isSubmit, className}: ButtonProps) =>
    {
        const styleList = [styles.Button];
        if (isAccent) styleList.push(styles.accent);
        if (className) styleList.push(className);

        return (
            <button type={ isSubmit ? "submit" : "button"} className={styleList.join(" ")}
            onClick={onClick}>{text}</button>
        );
}

export default Button;