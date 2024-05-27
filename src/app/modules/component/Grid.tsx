import { FC } from "react";
import "./style.scss"
import { Col as Column, ColProps, Row as RowBS, RowProps } from "react-bootstrap";

interface Iprops extends ColProps { };
const Col: FC<Iprops> = (props) => {
    let { className, children, ...rest } = props;
    return (
        <Column className={`mb-4 px-3 ${className}`} {...rest}>
            {children}
        </Column>
    );
};

const Row: FC<RowProps> = (props) => {
    let { className, children, ...rest } = props;
    return (
        <RowBS className={`m-0 ${className}`} {...rest}>
            {children}
        </RowBS>
    );
};


export { Col, Row };
