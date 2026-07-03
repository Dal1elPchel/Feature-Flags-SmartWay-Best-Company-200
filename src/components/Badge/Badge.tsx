import styles from './Badge.module.scss';

interface BadgeProps {
    text: 'dev' | 'staging' | 'production' | 'enabled' | 'disabled';
}

const BadgeComponent = ({ text }: BadgeProps) => {
    return <div className={`${styles.badge} ${styles[text]}`}>{text}</div>;
};

export default BadgeComponent;
