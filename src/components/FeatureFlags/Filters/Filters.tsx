import styles from './Filters.module.scss';
import Button from '../../UI/Button/Button.tsx';
import { useNavigate } from 'react-router-dom';
import Input from '../../UI/Input/Input.tsx';
import Select from '../../UI/Select/Select.tsx';
import { useForm, useWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';

interface FormData {
    search?: string;
    environment?: string;
    status?: string;
}

interface FilterProps {
    onLoad: (data: FormData) => void;
    environmentOptions: { value: string; label: string }[];
    statusOptions: { value: string; label: string }[];
}

const Filters = ({ onLoad, environmentOptions, statusOptions }: FilterProps) => {
    const navigate = useNavigate();

    const { register, control, reset } = useForm<FormData>({
        defaultValues: { search: '', environment: '', status: '' },
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

    return (
        <section className={styles.card}>
            <form className={styles.filtersManager} onSubmit={(e) => e.preventDefault()}>
                <Input
                    placeholder={'Поиск по названию'}
                    typeInput={'text'}
                    {...register('search')}
                />
                <Select
                    options={environmentOptions}
                    {...register('environment')}
                    placeholder={'Окружение'}
                />
                <Select options={statusOptions} {...register('status')} placeholder={'Статус'} />
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
