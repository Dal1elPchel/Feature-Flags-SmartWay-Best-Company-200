import styles from "./Button.module.scss"
import {ReactNode} from "react";

interface ButtonProps {
    text: string | ReactNode;
    isAccent: boolean;
    onClick: () => void;
}

const Button =
    ({text, isAccent, onClick}: ButtonProps) =>
    {
        const styleList = [styles.Button];
        if (isAccent) styleList.push(styles.accent);

        return (
            <button className={styleList.join(" ")}
            onClick={onClick}>{text}</button>
        );
}

export default Button;