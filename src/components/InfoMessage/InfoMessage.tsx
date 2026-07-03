import styles from './InfoMessage.module.scss';
import { X } from 'lucide-react';

interface ErrorProps {
    message: string | null;
    status: 'success' | 'loading' | 'error';
    onClose?: () => void;
}

const InfoMessage = ({ message, status, onClose }: ErrorProps) => {
    let styleOfMessage = styles.infoMessage;
    if (status === 'success') styleOfMessage = styles.successMessage;
    if (status === 'error') styleOfMessage = styles.errorMessage;

    return (
        <div className={`${styles.infoMessage} ${styleOfMessage}`}>
            {message ? message : 'Неизвестное сообщение'}
            {status === 'error' && (
                <button onClick={onClose}>
                    <X />
                </button>
            )}
        </div>
    );
};

export default InfoMessage;
