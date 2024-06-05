import React from 'react';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';

type TRadioItem = {
    code: string | number;
    name: string;
    other?: boolean;
};

  type TProps = {
    lable?: string;
    name: string;
    className?: string;
    classLable?: string;
    labelClassName?: string;
    groupContainerClassName?: string;
    value: string | number | null;
    isRequired?: boolean;
    radioItemList: TRadioItem[];
    handleChange: (value: any) => void;
    otherField?: any;
    disabledFields?: Array<string | number>;
    disabled?: boolean;
  };

function RadioGroup(props: TProps) {
    const onChange = (e: RadioChangeEvent) => {
        props.handleChange(e);
    };

    return (
        <div className={props.className}>
            {props?.lable && (
                <span className={`text-lable-input lable mb-1 ${props?.classLable}`}>
                    {props?.lable}
                    {props?.isRequired && <span className="color-red"> *</span>}
                </span>
            )}
            <>
                <Radio.Group
                    disabled={props?.disabled}
                    onChange={onChange}
                    value={props?.value}
                    size="large"
                    name={props?.name}
                    className={props?.groupContainerClassName}>
                    {props.radioItemList.map((radioItem) => (
                        <Radio
                            disabled={props?.disabledFields?.includes(radioItem?.code)}
                            className={props?.labelClassName}
                            key={radioItem?.code}
                            value={radioItem?.code}>
                            <div className='d-flex justify-content-between gap-2'>
                                {radioItem?.name}
                                {(props.otherField && radioItem?.code === props?.value) && props?.otherField}
                            </div>
                        </Radio>
                    ))}
                </Radio.Group>
            </>
        </div>
    );
}

export default RadioGroup;