import React, { Children } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ISearchObjModel } from "../models/quanLyODichModels";
import { SEARCH_OBJECT_INIT } from "../constants/constants";
import { isValidDate } from "../../utils/ValidationSchema";
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
        .test("isValidDate", "Ngày không hợp lệ", isValidDate),
      ngayKhoiPhatDenNgay: Yup.date()
        .nullable()
        .max(new Date(), "Ngày không thể lớn hơn ngày hiện tại")
        .test("isValidDate", "Ngày không hợp lệ", isValidDate)
        .when("ngayKhoiPhatTuNgay", {
          is: (ngayKhoiPhatTuNgay: string | null) => ngayKhoiPhatTuNgay,
          then: Yup.date()
            .nullable()
            .test("isValidDate", "Ngày không hợp lệ", isValidDate)
            .min(
              Yup.ref("ngayKhoiPhatTuNgay"),
              "Ngày không được trước ngày khởi phát từ ngày"
            ),
          otherwise: Yup.date().nullable().notRequired(),
        }),
      ngayBaoCaoTuNgay: Yup.date()
        .nullable()
        .max(new Date(), "Ngày không thể lớn hơn ngày hiện tại")
        .test("isValidDate", "Ngày không hợp lệ", isValidDate),
      ngayBaoCaoDenNgay: Yup.date()
        .nullable()
        .max(new Date(), "Ngày không thể lớn hơn ngày hiện tại")
        .test("isValidDate", "Ngày không hợp lệ", isValidDate)
        .when("ngayBaoCaoTuNgay", {
          is: (ngayBaoCaoTuNgay: string | null) => ngayBaoCaoTuNgay,
          then: Yup.date()
            .nullable()
            .test("isValidDate", "Ngày không hợp lệ", isValidDate)
            .min(
              Yup.ref("ngayBaoCaoTuNgay"),
              "Ngày không được trước ngày báo cáo từ ngày"
            ),
          otherwise: Yup.date().nullable().notRequired(),
        }),
      ngayKetThucTuNgay: Yup.date()
        .nullable()
        .max(new Date(), "Ngày không thể lớn hơn ngày hiện tại")
        .test("isValidDate", "Ngày không hợp lệ", isValidDate),
      ngayKetThucDenNgay: Yup.date()
        .nullable()
        .max(new Date(), "Ngày không thể lớn hơn ngày hiện tại")
        .test("isValidDate", "Ngày không hợp lệ", isValidDate)
        .when("ngayKetThucTuNgay", {
          is: (ngayKetThucTuNgay: string | null) => ngayKetThucTuNgay,
          then: Yup.date()
            .nullable()
            .test("isValidDate", "Ngày không hợp lệ", isValidDate)
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
