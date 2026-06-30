import styles from "../Page.module.scss";
import {useNavigate, useParams} from "react-router-dom";
import featureFlagStore from "../../stores/FeatureFlagStore.ts";
import {ArrowLeft} from "lucide-react";
import FlagList from "../../components/FlagList/FlagList.tsx";
import Button from "../../components/Button/Button.tsx";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import ProductionWarning from "../../components/ProductionWarning/ProductionWarning.tsx";
import Modal from "../../components/Modal/Modal.tsx";


const FlagCardPage = observer(() => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            featureFlagStore.loadFlag(id);
        }
    }, [id]);


    if (featureFlagStore.isLoading) {
        return <div className={styles.infoMessage}>Загрузка флага...</div>
    }

    const currentFlag = featureFlagStore.currentFlag;

    if (!currentFlag) {
        return <div className={styles.infoMessage}>Флаг не найден</div>;
    }

    const turnFlag = () => {
        const turnOff = currentFlag.status === "enabled";
        featureFlagStore.turn(currentFlag?.id, turnOff);
        setIsModalOpen(false);
    }

    return (
        <>
        <section className={styles.section}>
            <div className={styles.title}>Карточка</div>
            <div className={styles.subtitle}>
                <button className={styles.buttonPrev}
                onClick={() => {navigate("/")}}>
                    <ArrowLeft/> Назад к списку флагов
                </button>
            </div>

            {currentFlag.environment === "production" && <ProductionWarning/>}
            <div className={styles.formContainer}>
                <h1 className={styles.containerTitle}>{currentFlag.name}</h1>
                <FlagList flag={currentFlag}/>
                <div className={styles.buttonManager}>
                    <Button
                        text={"Редактировать"}
                        isAccent={false}
                        isSubmit={false}
                    />
                    <Button
                        text={currentFlag.status === "enabled" ? "Выключить" : "Включить"}
                        isSubmit={false}
                        isAccent={true}
                        onClick={() => {setIsModalOpen(true)}}
                    />
                </div>
            </div>
        </section>
            {isModalOpen && (
                <Modal
                    title={"Подтверждение действия"}
                    infoText={<>Вы действительно хотите
                    {currentFlag.status === "enabled" ? " Выключить " : " Включить "}
                     флаг <strong>{currentFlag.name}</strong>?</>}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={turnFlag}/>
            )}
        </>
    );
})

export default FlagCardPage;