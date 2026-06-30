import {useMemo, useState} from "react";
import styles from "./Table.module.scss";
import {ChevronLeft, ChevronRight} from "lucide-react";

interface Column<T> {
    key: keyof T | string;
    title: string;
    width?: string;
    render?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    pageSize?: number;
}

function Table<T>({
                      data,
                      columns,
                      pageSize = 6
                  }: TableProps<T>) {

    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(data.length / pageSize);

    const currentData = useMemo(() => {

        const start = (page - 1) * pageSize;

        return data.slice(start, start + pageSize);

    }, [data, page, pageSize]);

    return (
        <div className={styles.wrapper}>

            <table className={styles.table}>

                <thead>
                <tr>

                    {columns.map(column => (
                        <th
                            key={String(column.key)}
                            style={{width: column.width}}
                        >
                            {column.title}
                        </th>
                    ))}

                </tr>
                </thead>

                <tbody>

                {currentData.map((row, index) => (

                    <tr key={index}>

                        {columns.map(column => (

                            <td key={String(column.key)}>

                                {column.render
                                    ? column.render(row)
                                    : String(row[column.key as keyof T])}

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

                    <button
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                    >
                        <ChevronLeft size={18}/>
                    </button>

                    {Array.from({length: totalPages}, (_, i) => i + 1).map(i => (

                        <button
                            key={i}
                            className={page === i ? styles.active : ""}
                            onClick={() => setPage(i)}
                        >
                            {i}
                        </button>

                    ))}

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(p => p + 1)}
                    >
                        <ChevronRight size={18}/>
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Table;