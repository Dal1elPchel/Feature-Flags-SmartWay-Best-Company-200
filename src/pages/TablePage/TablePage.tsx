import Badge from "../../components/Badge/Badge.tsx";
import {FeatureFlag} from "../../types/featureFlag.ts";
import Button from "../../components/Button/Button.tsx";
import Table from "../../components/Table/Table.tsx";
import styles from "../Page.module.scss";
import {observer} from "mobx-react-lite";
import featureFlagStore from "../../stores/FeatureFlagStore.ts";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import InfoMessage from "../../components/InfoMessage/InfoMessage.tsx";

const TablePage = observer(() => {

    const navigate = useNavigate();

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
                new Date(row.updatedAt).toLocaleString()
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

    const flags = featureFlagStore.flags;
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

            {(!featureFlagStore.error && !featureFlagStore.isLoading) && (
                <>
                    <div className={styles.title}>Feature flags</div>
                    <div className={styles.subtitle}>Система управления флагами</div>
                    <Table data={flags} columns={columns} pageSize={6} />
                </>
            )}
        </section>
    );
});

export default TablePage;