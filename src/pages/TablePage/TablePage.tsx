import Badge from "../../components/Badge/Badge.tsx";
import {FeatureFlag, FlagEnvironment, FlagStatus} from "../../types/featureFlag.ts";
import Button from "../../components/Button/Button.tsx";
import Table from "../../components/Table/Table.tsx";
import styles from "../Page.module.scss";
import {observer} from "mobx-react-lite";
import featureFlagStore from "../../stores/FeatureFlagStore.ts";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import InfoMessage from "../../components/InfoMessage/InfoMessage.tsx";
import Filters from "../../components/Filters/Filters.tsx";

const TablePage = observer(() => {

    const navigate = useNavigate();

    const envVariants: {value: FlagEnvironment, label: string}[] = [
        {value: "staging", label: "staging"},
        {value: "production", label: "production"},
        {value: "dev", label: "development"}
    ];

    const statusVariants: {value: FlagStatus, label: string}[] = [
        {value: "enabled", label: "enabled"},
        {value: "disabled", label: "disabled"}
    ];

    const columns = [

        {
            key: "name",
            title: "Название"
        },

        {
            key: "description",
            title: "Описание"
        },

        {
            key: "environment",
            title: "Окружение",
            render: (row: FeatureFlag) => (
                <Badge text={row.environment}/>
            )
        },

        {
            key: "status",
            title: "Статус",
            render: (row: FeatureFlag) => (
                <Badge text={row.status}/>
            )
        },

        {
            key: "owner",
            title: "Владелец"
        },

        {
            key: "updatedAt",
            title: "Последнее изменение",
            render: (row: FeatureFlag) =>
                (row.updatedAt ? new Date(row.updatedAt).toLocaleString() : "Изменений не было.")
        },

        {
            key: "action",
            title: "Действия",
            render: (row: FeatureFlag) => (
                <Button text={"Открыть"} isSubmit={false} isAccent={false}
                        onClick={() => navigate(`/flags/${row.id}`)}/>
            )
        }

    ];

    useEffect(() => {
        featureFlagStore.loadFlags();
    }, []);

    const onFiltersChange = (
        data: {
            search?: string,
            environment?: string,
            status?: string
        }
        ) => {

        featureFlagStore.loadFlags({
            search: data.search || undefined,
            environment: data.environment || undefined,
            status: data.status || undefined,
        });
    }

    const flags = featureFlagStore.flags;
    return (
        <section className={styles.section}>
            {featureFlagStore.error && (
                <InfoMessage message={featureFlagStore.error}
                             status={"error"}
                             onClose={() => {featureFlagStore.setErrorNull()}}/>
            )}

            <div className={styles.title}>Feature flags</div>
            <div className={styles.subtitle}>Система управления флагами</div>
            <Filters onLoad={onFiltersChange}
                     environmentOptions={envVariants}
                     statusOptions={statusVariants}/>

            {featureFlagStore.isLoading && (
                <InfoMessage message={"Загрузка, пожалуйста подождите..."} status={"loading"}/>
            )}

            {(!featureFlagStore.error && !featureFlagStore.isLoading) && (
                <>
                    <Table data={flags} columns={columns} pageSize={6} />
                </>
            )}
        </section>
    );
});

export default TablePage;