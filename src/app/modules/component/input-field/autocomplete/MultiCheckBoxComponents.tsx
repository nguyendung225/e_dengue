import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { OptionProps, components } from "react-select";

const Option = (props: OptionProps) => {
    return (
        <div>
            <components.Option {...props}>
                <div className="d-flex align-items-center gap-1">
                    <input
                        type="checkbox"
                        checked={props.isSelected}
                    />
                    <label>{props.label}</label>
                </div>
            </components.Option>
        </div>
    );
};

const renderTooltipValueSelected = (listSelected: any, valueSearch: string) => (
    <Tooltip id="button-tooltip">
        <div className="text-primary">
            {listSelected?.map((item: any) =>
                item?.[valueSearch])?.toString()}
        </div>
    </Tooltip>
);

const MenuList = (props: any) => {
    const { selectProps, options, getValue } = props
    const values = getValue()
    const isSelectAll = values.length === options.length
    const handleSelectAll = () => {
        const selectedValues = isSelectAll ? [] : options;
        selectProps.onChange(selectedValues);
    };

    return (
        <components.MenuList {...props}>
            <div className="d-flex align-items-center gap-4 spaces px-12 py-8 m-5" onClick={handleSelectAll}>
                <input
                    type="checkbox"
                    checked={isSelectAll}
                />
                <label>Chọn tất cả</label>
            </div>
            {props.children}
        </components.MenuList>
    );
};

const CustomMultiValue = ({ index, getValue, children, selectProps }: any) => {

    const values = getValue();
    if (index === 0) {
        return (
            <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltipValueSelected(values, selectProps?.valueSearch)}
            >
                <div>{values?.length === 1 ? children : values.length + ` ${selectProps.lable} được chọn`}</div>
            </OverlayTrigger>
        );
    }
    return null;
};

export const MultiCheckBoxComponents = {
    Option, MenuList, MultiValue: CustomMultiValue
}