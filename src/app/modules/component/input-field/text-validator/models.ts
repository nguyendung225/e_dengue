import { FormikErrors, FormikTouched } from "formik";
import { ElementType } from "react";
import { Placement } from "../../CustomTooltip";


interface ICommonTextValidatorProps {
    isRequired?: boolean;
    touched?: boolean | FormikTouched<any> | FormikTouched<any>[];
    errors?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
    type?: string;
    className?: string;
    placeholder?: string;
    lable?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    as?: ElementType | string;
    readOnly?: boolean;
    name?: string;
    value?: any;
    [key: string]: any;
}

interface ISearchProps {
    isSearch: true;
    handleSearch: () => void;
}

interface ITooltip {
    isTooltip?: true;
    titleTooltip?: string;
    placementTooltip?: Placement;
    delayTooltip?: number;
}

interface INoSearchProps {
    isSearch?: false;
    handleSearch?: undefined;
}

interface IconProps {
    icon: string;
    handleIcon: () => void;
}

interface INoIconProps {
    icon?: undefined;
    handleIcon?: undefined;
}

export type TextValidatorProps = ICommonTextValidatorProps 
    & ITooltip
    & (
        | ISearchProps
        | INoSearchProps
    ) & (
        | IconProps
        | INoIconProps
    );