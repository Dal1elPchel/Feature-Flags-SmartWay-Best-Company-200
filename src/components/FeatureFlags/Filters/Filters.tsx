import styles from './Filters.module.scss';
import Button from '../../UI/Button/Button.tsx';
import { useNavigate } from 'react-router-dom';
import Input from '../../UI/Input/Input.tsx';
import Select from '../../UI/Select/Select.tsx';
import { useForm, useWatch } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';

interface FormData {
    search?: string;
    environment?: string;
    status?: string;
    team?: boolean;
}

interface FilterProps {
    onLoad: (data: FormData) => void;
    environmentOptions: { value: string; label: string }[];
    statusOptions: { value: string; label: string }[];
}

const Filters = ({ onLoad, environmentOptions, statusOptions }: FilterProps) => {
    const navigate = useNavigate();

    const { register, control, reset } = useForm<FormData>({
        defaultValues: { search: '', environment: '', status: '', team: false },
    });

    const values = useWatch({ control });

    const [debounced, setDebounced] = useState(values);

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(values), 1000);
        return () => clearTimeout(timer);
    }, [values]);

    useEffect(() => {
        onLoad(debounced as FormData);
    }, [debounced, onLoad]);

    const onCreate = () => {
        navigate('/add');
    };

    const newEnvOptions = useMemo(
        () => [{ value: '', label: 'Нет' }, ...environmentOptions],
        [environmentOptions],
    );

    const newStatusOptions = useMemo(
        () => [{ value: '', label: 'Нет' }, ...statusOptions],
        [statusOptions],
    );

    return (
        <section className={styles.card}>
            <form className={styles.filtersManager} onSubmit={(e) => e.preventDefault()}>
                <Input
                    placeholder={'Поиск по названию'}
                    typeInput={'text'}
                    {...register('search')}
                />
                <Select
                    options={newEnvOptions}
                    {...register('environment')}
                    placeholder={'Окружение'}
                />
                <Select options={newStatusOptions} {...register('status')} placeholder={'Статус'} />

                <label htmlFor="team" className={styles.checkboxLabel}>
                    <Input id="team" typeInput="checkbox" {...register('team')} />
                    Показать флаги моей команды
                </label>
            </form>

            <div className={styles.button}>
                <Button
                    text={'Сбросить фильтры'}
                    isAccent={false}
                    isSubmit={false}
                    onClick={() => reset()}
                />
                <Button text={'Создать флаг'} isAccent isSubmit={false} onClick={onCreate} />
            </div>
        </section>
    );
};

export default Filters;
