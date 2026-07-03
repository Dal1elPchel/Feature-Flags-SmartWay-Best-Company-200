import {FeatureFlag} from "../../types/featureFlag.ts";
import styles from "./FlagList.module.scss";
import Badge from "../Badge/Badge.tsx";
import {Copy} from "lucide-react";

interface FlagCardProps {
    flag: FeatureFlag;
}

const FlagList = ({flag}: FlagCardProps) => {

    const data = {
        name: flag.name,
        description: flag.description,
        environment: flag.environment,
        status: flag.status,
        owner: flag.owner,
        createdBy: flag.createdBy,
        createdAt: flag.createdAt,
        updatedBy: flag.updatedBy,
        updatedAt: flag.updatedAt
    }

    const handleCopy = async () => {
        await navigator.clipboard.writeText(data.name);
    }

    return (
        <dl className={styles.flagCard}>
            <div className={styles.cardRow}>
                <dt>Название</dt>
                <dd>
                    <span>{data.name}</span>
                    <button onClick={handleCopy}>
                        <Copy/>
                    </button>
                </dd>
            </div>

            <div className={styles.cardRow}>
                <dt>Описание</dt>
                <dd>{data.description}</dd>
            </div>

            <div className={styles.cardRow}>
                <dt>Окружение</dt>
                <dd><Badge text={data.environment}/></dd>
            </div>

            <div className={styles.cardRow}>
                <dt>Статус</dt>
                <dd><Badge text={data.status}/></dd>
            </div>

            <div className={styles.cardRow}>
                <dt>Владелец</dt>
                <dd>{data.owner}</dd>
            </div>

            <div className={styles.cardRow}>
                <dt>Дата создания</dt>
                <dd>
                    <span>{new Date(data.createdAt).toLocaleString()}</span>
                    <span>{data.createdBy}</span>
                </dd>
            </div>

            <div className={styles.cardRow}>
                <dt>Последнее изменение</dt>
                <dd>
                    <span>{data.updatedAt ?
                        new Date(data.updatedAt).toLocaleString() : "Изменений не было."}</span>
                    <span>{data.updatedBy ? data.updatedBy : ""}</span>
                </dd>
            </div>

        </dl>
    );
}

export default FlagList;