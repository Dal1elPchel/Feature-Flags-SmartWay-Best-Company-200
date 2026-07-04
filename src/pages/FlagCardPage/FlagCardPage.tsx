import styles from '../Page.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import featureFlagStore from '../../stores/FeatureFlagStore.ts';
import { ArrowLeft, AlertTriangleIcon } from 'lucide-react';
import FlagList from '../../components/FeatureFlags/FlagList/FlagList.tsx';
import Button from '../../components/UI/Button/Button.tsx';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import ProductionWarning from '../../components/FeatureFlags/ProductionWarning/ProductionWarning.tsx';
import Modal from '../../components/UI/Modal/Modal.tsx';
import InfoMessage from '../../components/UI/InfoMessage/InfoMessage.tsx';
import userStore from '../../stores/UserStore.ts';
import { useLocation } from 'react-router-dom';

const FlagCardPage = observer(() => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams();
    const location = useLocation();
    const [showSuccess, setShowSuccess] = useState(location.state?.created ?? false);

    useEffect(() => {
        if (!showSuccess) return;

        const timer = setTimeout(() => {
            setShowSuccess(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [showSuccess]);

    useEffect(() => {
        if (id) {
            featureFlagStore.loadFlag(id);
        }
    }, [id]);

    const currentFlag = featureFlagStore.currentFlag;

    if (!currentFlag) {
        return (
            <InfoMessage
                message={'Флаг не найден, попробуйте позже!'}
                status={'error'}
                onClose={() => {
                    navigate('/');
                }}
            />
        );
    }

    const turnFlag = () => {
        const turnOff = currentFlag.status === 'enabled';
        featureFlagStore.turn(currentFlag?.id, turnOff);
        setIsModalOpen(false);
    };

    const editClick = () => {
        navigate(`/flags/${currentFlag.id}/edit`);
    };

    const canUserEdit = userStore.currentUser?.teamId === currentFlag.owner_team_id;

    return (
        <>
            <section className={styles.section}>
                {showSuccess && <InfoMessage message="Флаг успешно создан!" status="success" />}

                {featureFlagStore.error && (
                    <InfoMessage
                        message={featureFlagStore.error}
                        status={'error'}
                        onClose={() => {
                            featureFlagStore.setErrorNull();
                        }}
                    />
                )}

                {featureFlagStore.isLoading && (
                    <InfoMessage message={'Загрузка, пожалуйста подождите...'} status={'loading'} />
                )}
                <div className={styles.title}>Карточка</div>
                <div className={styles.subtitle}>
                    <button
                        className={styles.buttonPrev}
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        <ArrowLeft /> Назад к списку флагов
                    </button>
                </div>

                {currentFlag.environment === 'production' && <ProductionWarning />}
                <div className={styles.formContainer}>
                    <h1 className={styles.containerTitle}>{currentFlag.name}</h1>
                    <FlagList flag={currentFlag} />
                    <div className={styles.buttonManager}>
                        {!canUserEdit && (
                            <span>
                                {' '}
                                <AlertTriangleIcon /> Вы не можете редактировать флаг, который
                                принадлежит другой команде!
                            </span>
                        )}

                        <div className={styles.buttons}>
                            <Button
                                text={'Редактировать'}
                                isAccent={false}
                                isSubmit={false}
                                onClick={editClick}
                                isDisabled={!canUserEdit}
                            />
                            <Button
                                text={currentFlag.status === 'enabled' ? 'Выключить' : 'Включить'}
                                isSubmit={false}
                                isAccent
                                onClick={() => {
                                    setIsModalOpen(true);
                                }}
                                isDisabled={!canUserEdit}
                            />
                        </div>
                    </div>
                </div>
            </section>
            {isModalOpen && (
                <Modal
                    title={'Подтверждение действия'}
                    infoText={
                        <>
                            Вы действительно хотите
                            {currentFlag.status === 'enabled' ? ' Выключить ' : ' Включить '}
                            флаг <strong>{currentFlag.name}</strong>?
                        </>
                    }
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={turnFlag}
                />
            )}
        </>
    );
});

export default FlagCardPage;
