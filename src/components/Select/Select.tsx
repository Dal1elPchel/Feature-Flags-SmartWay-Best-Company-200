import styles from "./Select.module.scss";

interface SelectOptions {
    value: string;
    label: string;
}

interface SelectProps {
    name: string;
    options: SelectOptions[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    isRequired?: boolean;
}

const Select = ({name, options, value,
                onChange, placeholder = "Выберите вариант", isRequired = true}: SelectProps) => {
    return (
        <select className={styles.select}
        name={name}
        id={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={isRequired}>
            {placeholder && (
                <option value="" disabled>{placeholder}</option>
            )}

            {options.map(item => (
                <option key={item.value} value={item.value}>
                    {item.label}
                </option>
            ))}
        </select>
    );
};

export default Select;