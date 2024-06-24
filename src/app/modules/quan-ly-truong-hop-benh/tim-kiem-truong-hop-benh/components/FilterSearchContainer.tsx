import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ISearchObjectModel } from "../../models/TimKiemTruongHopBenhModels";
import { regex } from "../../../constant";
import { MIN_DATE_200 } from "../../../../Constant";

type Props = {
    children: React.ReactNode;
    searchObject: ISearchObjectModel;
    setSearchObject: React.Dispatch<React.SetStateAction<ISearchObjectModel>>;
    handleCloseModal?: () => void;
};

const FilterSearchContainer = (props: Props) => {
    let { 
        children,
        searchObject, 
        setSearchObject, 
        handleCloseModal 
    } = props;

    const handleSubmit = (values: any) => {
        setSearchObject(values);
        handleCloseModal?.();
    };
   
    const validationSchema = Yup.object().shape({
      hoTen: Yup.string().nullable()
            .matches(regex.name,"Họ tên không được chứa ký tự số hoặc ký tự đặc biệt")
            .max(50, "Không được quá 50 ký tự"),
      tuNgayNhapBaoCao: Yup.date()
        .nullable()
        .max(new Date(), "Ngày không thể lớn hơn ngày hiện tại")
        .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`),
      denNgayNhapBaoCao: Yup.date()
        .nullable()
        .max(new Date(), "Ngày không thể lớn hơn ngày hiện tại")
        .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`)
        .when("tuNgayNhapBaoCao", {
          is: (tuNgayNhapBaoCao: string | null) => tuNgayNhapBaoCao,
          then: Yup.date()
            .nullable()
            .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`)
            .min(
              Yup.ref("tuNgayNhapBaoCao"),
              "Ngày không được trước ngày nhập báo cáo từ"
            ),
          otherwise: Yup.date().nullable().notRequired(),
        }),
      tuNgayKhoiPhat: Yup.date()
        .nullable()
        .max(new Date(), "Ngày không thể lớn hơn ngày hiện tại")
        .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`),
      denNgayKhoiPhat: Yup.date()
        .nullable()
        .max(new Date(), "Ngày không thể lớn hơn ngày hiện tại")
        .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`)
        .when("tuNgayKhoiPhat", {
          is: (tuNgayKhoiPhat: string | null) => tuNgayKhoiPhat,
          then: Yup.date()
            .nullable()
            .min(
              Yup.ref("tuNgayKhoiPhat"),
              "Ngày không được trước ngày khởi phát từ"
            ),
          otherwise: Yup.date().nullable().notRequired(),
        }),
      tuNgayNhapVien: Yup.date()
        .nullable()
        .max(new Date(), "Ngày không thể lớn hơn ngày hiện tại")
        .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`),
      denNgayNhapVien: Yup.date()
        .nullable()
        .max(new Date(), "Ngày không thể lớn hơn ngày hiện tại")
        .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`)
        .when("tuNgayNhapVien", {
          is: (tuNgayNhapVien: string | null) => tuNgayNhapVien,
          then: Yup.date()
            .nullable()
            .min(
              Yup.ref("tuNgayNhapVien"),
              "Ngày không được trước ngày nhập viện từ"
            ),
          otherwise: Yup.date().nullable().notRequired(),
        }),
      tuNgayRaVien: Yup.date()
        .nullable()
        .max(new Date(), "Ngày không thể lớn hơn ngày hiện tại")
        .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`),
      denNgayRaVien: Yup.date()
        .nullable()
        .max(new Date(), "Ngày không thể lớn hơn ngày hiện tại")
        .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`)
        .when("tuNgayRaVien", {
          is: (tuNgayRaVien: string | null) => tuNgayRaVien,
          then: Yup.date()
            .nullable()
            .min(
              Yup.ref("tuNgayRaVien"),
              "Ngày không được trước ngày ra viện/tử vong từ"
            ),
          otherwise: Yup.date().nullable().notRequired(),
        }),
      tuNgayLayMau: Yup.date()
        .nullable()
        .max(new Date(), "Ngày không thể lớn hơn ngày hiện tại")
        .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`),
      denNgayLayMau: Yup.date()
        .nullable()
        .max(new Date(), "Ngày không thể lớn hơn ngày hiện tại")
        .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`)
        .when("tuNgayLayMau", {
          is: (tuNgayLayMau: string | null) => tuNgayLayMau,
          then: Yup.date()
            .nullable()
            .min(
              Yup.ref("tuNgayLayMau"),
              "Ngày không được trước ngày lấy mẫu xét nghiệm từ"
            ),
          otherwise: Yup.date().nullable().notRequired(),
        }),
      tuNgayTraKetQuaXn: Yup.date()
        .nullable()
        .max(new Date(), "Ngày không thể lớn hơn ngày hiện tại")
        .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`),
      denNgayTraKetQuaXn: Yup.date()
        .nullable()
        .max(new Date(), "Ngày không thể lớn hơn ngày hiện tại")
        .min(new Date(new Date().setFullYear(MIN_DATE_200)), `Phải từ năm ${MIN_DATE_200} trở đi`)
        .when("tuNgayTraKetQuaXn", {
          is: (tuNgayTraKetQuaXn: string | null) => tuNgayTraKetQuaXn,
          then: Yup.date()
            .nullable()
            .min(
              Yup.ref("tuNgayTraKetQuaXn"),
              "Ngày không được trước ngày trả kết quả từ"
            ),
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
