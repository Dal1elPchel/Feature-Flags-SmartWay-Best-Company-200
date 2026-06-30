import styles from "./Select.module.scss";
import {forwardRef, SelectHTMLAttributes} from "react";

interface SelectOptions {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    options: SelectOptions[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>
(({options, ...rest}, ref) => {
    return (
        <select className={styles.select}
        ref={ref}
        {...rest}>
            {options.map(item => (
                <option key={item.value} value={item.value}>
                    {item.label}
                </option>
            ))}
        </select>
    );
});

export default Select;