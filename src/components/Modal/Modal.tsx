import styles from "./Modal.module.scss";
import {XIcon, AlertTriangleIcon, PowerIcon} from "lucide-react";
import {ReactNode} from "react";
import Button from "../Button/Button.tsx";

interface ModalProps {
    title: string;
    infoText: string | ReactNode;
    optionText?: string | ReactNode;
    onClose: () => void;
    onConfirm: () => void;
}

const Modal = ({title, infoText, optionText, onClose, onConfirm}: ModalProps) => {

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalTitle}>
                    <h1>{title}</h1>
                    <XIcon onClick={onClose}/>
                </div>

                <div className={styles.modalInfo}>{infoText}</div>

                {optionText && (
                    <div className={styles.modalOption}>
                        <AlertTriangleIcon/>
                        {optionText}
                    </div>
                )}

                <div className={styles.modalButtons}>
                    <Button text={"Отмена"} isAccent={false} isSubmit={false} onClick={onClose}/>
                    <Button text={<>
                        <PowerIcon/>
                        Подтвердить
                    </>} isSubmit={false} isAccent={true}
                    onClick={onConfirm}/>
                </div>
            </div>
        </div>

    );
}

export default Modal;