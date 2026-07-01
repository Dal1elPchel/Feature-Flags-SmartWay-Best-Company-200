import {useForm} from "react-hook-form";
import featureFlagStore from "../../stores/FeatureFlagStore.ts";
import styles from "../Page.module.scss";
import Input from "../../components/Input/Input.tsx";
import {AlertCircle} from "lucide-react";
import Textarea from "../../components/Texarea/Textarea.tsx";
import Select from "../../components/Select/Select.tsx";
import {FlagEnvironment, FlagStatus} from "../../types/featureFlag.ts";
import Button from "../../components/Button/Button.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import ProductionWarning from "../../components/ProductionWarning/ProductionWarning.tsx";
import InfoMessage from "../../components/InfoMessage/InfoMessage.tsx";

interface FormData {
    name: string;
    description: string;
    environment: FlagEnvironment;
    status: FlagStatus;
}

const envVariants: {value: FlagEnvironment, label: string}[] = [
    {value: "staging", label: "staging"},
    {value: "production", label: "production"},
    {value: "development", label: "development"}
];

const statusVariants: {value: FlagStatus, label: string}[] = [
    {value: "enabled", label: "enabled"},
    {value: "disabled", label: "disabled"}
];

const EditPage = observer(() => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<FormData>();
    const navigate = useNavigate();

    const {id} = useParams();
    const currentFlag = featureFlagStore.currentFlag;

    useEffect(() => {
        if (id) {
            featureFlagStore.loadFlag(id);
        }
    }, [id]);

    useEffect(() => {
        if (currentFlag) {
            reset({
                name: currentFlag.name,
                description: currentFlag.description,
                environment: currentFlag.environment,
                status: currentFlag.status,
            });
        }
    }, [currentFlag, reset]);

    if (!id) {
        return <InfoMessage message={"Не удалось подключиться к флагу, попробуйте позже!"} status={"error"}
                            onClose={() => {navigate("/")}}/>
    }

    if (!currentFlag) {
        return <InfoMessage message={"Флаг не найден, попробуйте позже!"} status={"error"}
                            onClose={() => {navigate("/")}}/>
    }

    const onSubmit = async (data: FormData) => {
        const newFlag = {
            name: data.name,
            description: data.description,
            status: data.status,
            environment: data.environment
        };
        await featureFlagStore.update(id, newFlag);

        if (!featureFlagStore.error && !featureFlagStore.isLoading) {
            navigate(`/flags/${currentFlag.id}`);
        }

    }

    const onClose = () => {
        navigate(-1);
    };

    return (
        <section className={styles.section}>
            {featureFlagStore.error && (
                <InfoMessage message={featureFlagStore.error}
                             status={"error"}
                             onClose={() => {featureFlagStore.setErrorNull()}}/>
            )}

            {featureFlagStore.isLoading && (
                <InfoMessage message={"Загрузка, пожалуйста подождите..."} status={"loading"}/>
            )}
            <div className={styles.title}>Редактирование feature flag</div>
            <div className={styles.subtitle}>Изменение параметров флага флага</div>
            {currentFlag.environment === "production" && <ProductionWarning/>}
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className={styles.field}>
                        <label htmlFor={"name"}>Название (должно быть уникальным)</label>
                        <Input
                            id={"name"}
                            typeInput={"text"}
                            {...register("name", {
                                required: "Название обязательно!",
                                minLength: {
                                    value: 6,
                                    message: "Минимум 6 символов"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Максимум 20 символов"
                                }
                            })}
                        />
                        {errors.name && (
                            <div className={styles.errorText}>
                                <AlertCircle />
                                {errors.name.message}
                            </div>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor={"description"}>Описание</label>
                        <Textarea
                            id={"description"}
                            rows={4}
                            {...register("description", {
                                required: "Описание обязательно!",
                                minLength: {
                                    value: 6,
                                    message: "Минимум 6 символов"
                                }
                            })}
                        />
                        {errors.description && (
                            <div className={styles.errorText}>
                                <AlertCircle />
                                {errors.description.message}
                            </div>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor={"env"}>Окружение</label>
                        <Select
                            id="env"
                            options={envVariants}
                            {...register("environment")}
                        />

                        {errors.environment && (
                            <div className={styles.errorText}>
                                <AlertCircle />
                                {errors.environment.message}
                            </div>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor={"status"}>Статус</label>

                        <Select
                            id="status"
                            options={statusVariants}
                            {...register("status")}
                        />

                        {errors.status && (
                            <div className={styles.errorText}>
                                <AlertCircle />
                                {errors.status.message}
                            </div>
                        )}
                    </div>

                    <div className={styles.buttonManager}>
                        <Button
                            text={"Отмена"}
                            isAccent={false}
                            isSubmit={false}
                            onClick={onClose}
                        />
                        <Button
                            text={"Сохранить"}
                            isSubmit={true}
                            isAccent={true}
                        />
                    </div>

                </form>
            </div>
        </section>
    );
});

export default EditPage;