import { ChangeEvent, FC } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { KTSVG } from '../../../_metronic/helpers';

type Props = {
    value?: string
    name?: string
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
    handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    handleSearch?: () => void;
    placeholder?: string;
    type?: string;
    className?: string;
}

const InputSearch: FC<Props> = ({ ...props }) => {
    let { value, name, handleChange, handleKeyDown, handleSearch, type, className, placeholder } = props
    return (
        <Form.Group className='position-relative'>
            <FormControl
                className={`form-control customs-input ${className ? className : ""}`}
                value={value}
                name={name}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder ? placeholder : ""}
                type={type ? type : "text"}
            />
            <div className="searchTextField" onClick={handleSearch}>
                <KTSVG path='/media/icons/search.svg' svgClassName='spaces color-gray icon'/>
            </div>
        </Form.Group>
    );
};

export default InputSearch