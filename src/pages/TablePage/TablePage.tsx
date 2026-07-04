import Badge from '../../components/FeatureFlags/Badge/Badge.tsx';
import { FeatureFlag, FlagEnvironment, FlagStatus } from '../../types/featureFlag.ts';
import Button from '../../components/UI/Button/Button.tsx';
import Table from '../../components/FeatureFlags/Table/Table.tsx';
import styles from '../Page.module.scss';
import { observer } from 'mobx-react-lite';
import featureFlagStore from '../../stores/FeatureFlagStore.ts';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoMessage from '../../components/UI/InfoMessage/InfoMessage.tsx';
import Filters from '../../components/FeatureFlags/Filters/Filters.tsx';
import userStore from '../../stores/UserStore.ts';

const TablePage = observer(() => {
    const navigate = useNavigate();

    const envVariants: { value: FlagEnvironment; label: string }[] = [
        { value: 'staging', label: 'staging' },
        { value: 'production', label: 'production' },
        { value: 'dev', label: 'development' },
    ];

    const statusVariants: { value: FlagStatus; label: string }[] = [
        { value: 'enabled', label: 'enabled' },
        { value: 'disabled', label: 'disabled' },
    ];

    const columns = [
        {
            key: 'name',
            title: 'Название',
        },

        {
            key: 'description',
            title: 'Описание',
            render: (row: FeatureFlag) => (
                <div className={styles.description}>{row.description}</div>
            ),
        },

        {
            key: 'environment',
            title: 'Окружение',
            render: (row: FeatureFlag) => <Badge text={row.environment} />,
        },

        {
            key: 'status',
            title: 'Статус',
            render: (row: FeatureFlag) => <Badge text={row.status} />,
        },

        {
            key: 'owner',
            title: 'Владелец',
        },

        {
            key: 'updatedAt',
            title: 'Последнее изменение',
            render: (row: FeatureFlag) =>
                row.updatedAt ? new Date(row.updatedAt).toLocaleString() : 'Изменений не было.',
        },

        {
            key: 'action',
            title: 'Действия',
            render: (row: FeatureFlag) => (
                <Button
                    text={'Открыть'}
                    isSubmit={false}
                    isAccent={false}
                    onClick={() => navigate(`/flags/${row.id}`)}
                />
            ),
        },
    ];

    useEffect(() => {
        featureFlagStore.loadFlags();
    }, []);

    const onFiltersChange = useCallback(
        (data: { search?: string; environment?: string; status?: string; team?: boolean }) => {
            featureFlagStore.loadFlags({
                search: data.search || undefined,
                environment: data.environment || undefined,
                status: data.status || undefined,
                team: (data.team ? userStore.currentUser?.teamId : '') || undefined,
            });
        },
        [],
    );

    const flags = featureFlagStore.flags;
    return (
        <section className={styles.section}>
            {featureFlagStore.error && (
                <InfoMessage
                    message={featureFlagStore.error}
                    status={'error'}
                    onClose={() => {
                        featureFlagStore.setErrorNull();
                    }}
                />
            )}

            <div className={styles.title}>Feature flags</div>
            <div className={styles.subtitle}>Система управления флагами</div>
            <Filters
                onLoad={onFiltersChange}
                environmentOptions={envVariants}
                statusOptions={statusVariants}
            />

            {featureFlagStore.isLoading && (
                <InfoMessage message={'Загрузка, пожалуйста подождите...'} status={'loading'} />
            )}

            {!featureFlagStore.error && !featureFlagStore.isLoading && (
                <>
                    <Table data={flags} columns={columns} pageSize={6} />
                </>
            )}
        </section>
    );
});

export default TablePage;
