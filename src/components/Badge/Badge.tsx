import styles from "./Badge.module.scss";

interface BadgeProps {
    text: "development" | "staging" | "production" | "enabled" | "disabled";
}

const BadgeComponent =
    ({text}: BadgeProps) => {

    return (
        <div className={`${styles.badge} ${styles[text]}`}>{text}</div>
    );
}

export default BadgeComponent;