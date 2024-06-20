import React, { Children } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ISearchObjModel } from "../models/quanLyODichModels";
import { SEARCH_OBJECT_INIT } from "../constants/constants";
import { MIN_DATE_200 } from "../../../Constant";

type Props = {
    children: React.ReactNode;
    setSearchObj: React.Dispatch<React.SetStateAction<ISearchObjModel>>;
};

const FilterSearchContainer = (props: Props) => {
    const {children, setSearchObj} = props;
    const handleSubmit = (values: ISearchObjModel) => {
      setSearchObj(values)
    }

    const validationSchema = Yup.object().shape({
      ngayKhoiPhatTuNgay: Yup.date()
        .nullable()
        .max(new Date(), "Ngày không thể lớn hơn ngày hiện tại")
        .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`),
      ngayKhoiPhatDenNgay: Yup.date()
        .nullable()
        .max(new Date(), "Ngày không thể lớn hơn ngày hiện tại")
        .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`)
        .when("ngayKhoiPhatTuNgay", {
          is: (ngayKhoiPhatTuNgay: string | null) => ngayKhoiPhatTuNgay,
          then: Yup.date()
            .nullable()
            .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`)
            .min(
              Yup.ref("ngayKhoiPhatTuNgay"),
              "Ngày không được trước ngày khởi phát từ ngày"
            ),
          otherwise: Yup.date().nullable().notRequired(),
        }),
      ngayBaoCaoTuNgay: Yup.date()
        .nullable()
        .max(new Date(), "Ngày không thể lớn hơn ngày hiện tại")
        .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`),
      ngayBaoCaoDenNgay: Yup.date()
        .nullable()
        .max(new Date(), "Ngày không thể lớn hơn ngày hiện tại")
        .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`)
        .when("ngayBaoCaoTuNgay", {
          is: (ngayBaoCaoTuNgay: string | null) => ngayBaoCaoTuNgay,
          then: Yup.date()
            .nullable()
            .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`)
            .min(
              Yup.ref("ngayBaoCaoTuNgay"),
              "Ngày không được trước ngày báo cáo từ ngày"
            ),
          otherwise: Yup.date().nullable().notRequired(),
        }),
      ngayKetThucTuNgay: Yup.date()
        .nullable()
        .max(new Date(), "Ngày không thể lớn hơn ngày hiện tại")
        .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`),
      ngayKetThucDenNgay: Yup.date()
        .nullable()
        .max(new Date(), "Ngày không thể lớn hơn ngày hiện tại")
        .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`)
        .when("ngayKetThucTuNgay", {
          is: (ngayKetThucTuNgay: string | null) => ngayKetThucTuNgay,
          then: Yup.date()
            .nullable()
            .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`)
            .min(
              Yup.ref("ngayKetThucTuNgay"),
              "Ngày không được trước ngày kết thúc từ ngày"
            ),
          otherwise: Yup.date().nullable().notRequired(),
        }),
    });

    return (
            <Formik
                initialValues={SEARCH_OBJECT_INIT}
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
