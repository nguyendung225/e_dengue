import { FC, memo, useRef } from 'react';
import { ActionMeta, Props } from 'react-select';
import AsyncSelect from "react-select/async";

interface ComboboxProps extends Props {
    label?: string,
    name?: string,
    nameErrorMessage?: string,
    noDataMessage?: string,
    required?: boolean,
    isCallApi?: boolean,
    params?: object,
    fieldSearch?: string,
    valueField?: string,
    displayField?: string,
    placeholder?: string
    handleChange?: ((newValue: any, actionMeta?: ActionMeta<any>) => void) | undefined;
    service?: (param: any) => Promise<any>
    optionsResponse?: "content" | "data"
};

const customStyles = {
    control: (baseStyles: any, state: any) => ({
        ...baseStyles,
        height: '30px',
        minHeight: '30px',
        borderColor: state.isFocused ? '#CED4DA' : '#ced4da',
        boxShadow: 'none',
        color: 'var(--kt-input-color)',
        '&:hover': {
            borderColor: state.isFocused ? null : '#ced4da',
        }
    }),
    valueContainer: (baseStyles: any, state: any) => ({
        ...baseStyles,
        height: '30px',
    }),
    indicatorsContainer: (baseStyles: any, state: any) => ({
        ...baseStyles,
        height: '30px',
    }),
    input: (baseStyles: any, state: any) => ({
        ...baseStyles,
        margin: '0px',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    })
};

const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const AsyncAutoComplete: FC<ComboboxProps> = (props) => {
    const {
        label,
        name,
        nameErrorMessage = false,
        required = false,
        params,
        fieldSearch = 'keyword',
        valueField = 'id',
        displayField = 'label',
        noDataMessage = 'Không có dữ liệu',
        optionsResponse = 'data',
        placeholder = 'Nhập tên đơn vị để tìm kiếm...',
        handleChange,
        service,
        ...rest
    } = props;

    const fetchOptions = async (inputValue: string) => {
        try {
            if (service) {
                const response = await service({ [fieldSearch]: inputValue, ...params });
                const data = response?.data;
                return data?.[optionsResponse] || [];
            }
            return [];
        } catch {
            return [];
        }
    };

    const debouncedFetchOptions = useRef(
        debounce((inputValue: string, callback: (options: any[]) => void) => {
            fetchOptions(inputValue).then(callback);
        }, 1000)
    ).current;

    const loadOptions = (inputValue: string, callback: (options: any[]) => void) => {
        if (inputValue) {
            debouncedFetchOptions(inputValue, callback);
        } else {
            callback([]);
        }
    };

    const getOptionValue = (option: any): string => option[valueField];
    const getOptionLabel = (option: any): string => option[displayField];
    const noOptionsMessage = () => noDataMessage;

    return (
        <div>
            <span className={`text-lable-input lable`}>
                {label}
                {required && <span className="color-red"> *</span>}
            </span>
            <AsyncSelect
                {...rest}
                styles={customStyles}
                name={name}
                cacheOptions
                placeholder={placeholder}
                loadOptions={loadOptions}
                getOptionValue={getOptionValue}
                getOptionLabel={getOptionLabel}
                noOptionsMessage={noOptionsMessage}
                className='basic-multi-select mb-3'
                classNamePrefix='select'
                onChange={handleChange}
            />
            {nameErrorMessage &&
                <div className="error-message text-danger">{nameErrorMessage}</div>
            }
        </div>
    );
}

export default memo(AsyncAutoComplete);
