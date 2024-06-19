import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { IHuyen, ISearchBaoCao, ITinh, IXa } from "../model/model";
import { isValidDate } from "../../utils/ValidationSchema";
type Props = {
    children: React.ReactNode;
    searchObject: ISearchBaoCao;
    setSearchObject: React.Dispatch<React.SetStateAction<ISearchBaoCao>>;
};

const FilterSearchContainer = (props: Props) => {
    const { children, searchObject, setSearchObject } = props;
    const handleSubmit = (values: any) => {
         const newSearchObject = {
            ...values,
            tinhIds: values?.tinhIds?.map((item: ITinh) => item?.id),
            huyenIds: values?.huyenIds?.map((item: IHuyen) => item?.id),
            xaIds: values?.xaIds?.map((item: IXa) => item?.xaId),
            tuan: Number(values?.tuan)
         }
        setSearchObject(newSearchObject);
    };

    const validationSchema = Yup.object().shape({
      tuNgay: Yup.date()
        .nullable()
        .max(new Date(), "Ngày không thể lớn hơn ngày hiện tại")
        .test("isValidDate", "Ngày không hợp lệ", isValidDate),
      denNgay: Yup.date()
        .nullable()
        .max(new Date(), "Ngày không thể lớn hơn ngày hiện tại")
        .test("isValidDate", "Ngày không hợp lệ", isValidDate)
        .when("tuNgay", {
          is: (tuNgay: string | null) => tuNgay,
          then: Yup.date()
            .nullable()
            .test("isValidDate", "Ngày không hợp lệ", isValidDate)
            .min(Yup.ref("tuNgay"), "Ngày không được trước từ ngày"),
          otherwise: Yup.date().nullable().notRequired(),
        }),
    });

    return (
        <Formik
                initialValues={searchObject}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <Form noValidate>
                    {children}
                </Form>
        </Formik>
    );
};

export default FilterSearchContainer;
