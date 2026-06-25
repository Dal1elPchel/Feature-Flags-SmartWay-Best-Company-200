import styles from "./Button.module.scss"

interface ButtonProps {
    text: string,
    isAccent: boolean
}

const Button =
    ({text, isAccent}: ButtonProps) =>
    {
        const styleList = [styles.Button];
        if (isAccent) styleList.push(styles.accent);

        return (
            <button className={styleList.join(" ")}>{text}</button>
        );
}

export default Button;