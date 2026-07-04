import { useMemo, useState } from 'react';
import styles from './Table.module.scss';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import InfoMessage from '../../UI/InfoMessage/InfoMessage.tsx';
import { FeatureFlag } from '../../../types/featureFlag.ts';

interface Column {
    key: keyof FeatureFlag | string;
    title: string;
    width?: string;
    render?: (row: FeatureFlag) => React.ReactNode;
}

interface TableProps {
    data: FeatureFlag[];
    columns: Column[];
    pageSize?: number;
}

const Table = ({ data, columns, pageSize = 6 }: TableProps) => {
    const [page, setPage] = useState(1);

    const currentData = useMemo(() => {
        const start = (page - 1) * pageSize;

        return data.slice(start, start + pageSize);
    }, [data, page, pageSize]);

    if (data.length === 0) {
        return (
            <InfoMessage
                message={'Список флагов пуст. Вы можете добавить новый флаг!'}
                status={'success'}
            />
        );
    }

    const totalPages = Math.ceil(data.length / pageSize);

    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={String(column.key)} style={{ width: column.width }}>
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {currentData.map((row, index) => (
                        <tr key={index}>
                            {columns.map((column) => (
                                <td key={String(column.key)}>
                                    {column.render
                                        ? column.render(row)
                                        : String(row[column.key as keyof FeatureFlag])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={styles.footer}>
                <span>
                    Показано {currentData.length} из {data.length}
                </span>

                <div className={styles.pagination}>
                    <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                        <ChevronLeft size={18} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((i) => (
                        <button
                            key={i}
                            className={page === i ? styles.active : ''}
                            onClick={() => setPage(i)}
                        >
                            {i}
                        </button>
                    ))}

                    <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Table;
