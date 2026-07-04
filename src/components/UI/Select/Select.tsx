import styles from './Select.module.scss';
import { forwardRef, SelectHTMLAttributes } from 'react';

interface SelectOptions {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: SelectOptions[];
    placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ options, placeholder, ...rest }, ref) => {
        return (
            <select className={styles.select} ref={ref} {...rest}>
                {placeholder && (
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>
                )}
                {options.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
        );
    },
);

export default Select;
