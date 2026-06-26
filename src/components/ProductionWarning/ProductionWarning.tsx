import {AlertTriangleIcon} from "lucide-react";
import styles from "./ProductionWarning.module.scss";

const ProductionWarning = () => {
    return (
        <div className={styles.warningBox}>
            <AlertTriangleIcon/>

            <div className={styles.warningInfo}>
                <h1>Этот флаг используется в <span>production</span></h1>

                <p>Изменения этого флага могут повлиять на работу приложения
                для реальных пользователей. Пожалуйста, вносите изменения с вниманием.</p>
            </div>
        </div>
    );
}

export default ProductionWarning;