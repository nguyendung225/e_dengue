import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { SearchObjectModel } from "../../models/TimKiemTruongHopBenhModels";

type Props = {
    children: React.ReactNode;
    searchObject: SearchObjectModel;
    setSearchObject: React.Dispatch<React.SetStateAction<SearchObjectModel>>;
    handleCloseModal?: () => void;
};

const FilterSearchContainer = ({ 
    children,
    searchObject, 
    setSearchObject, 
    handleCloseModal 
}: Props) => {
    const handleSubmit = (values: any) => {
        setSearchObject(values);
        handleCloseModal?.();
    };

    const validationSchema = Yup.object().shape({
        TuNgayNhapBaoCao: Yup.date()
            .nullable()
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .max(Yup.ref('DenNgayNhapBaoCao'), 'Ngày không được sau ngày nhập báo cáo đến'),
        DenNgayNhapBaoCao: Yup.date()
            .nullable()
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .min(Yup.ref('TuNgayNhapBaoCao'), 'Ngày họp không được trước ngày nhập báo cáo từ'),
        tuNgayKhoiPhat: Yup.date()
            .nullable()
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .max(Yup.ref('denNgayKhoiPhat'), 'Ngày không được sau đến ngày khởi phát'),
        denNgayKhoiPhat: Yup.date()
            .nullable()
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .min(Yup.ref('tuNgayKhoiPhat'), 'Ngày họp không được trước từ ngày khởi phát'),
        tuNgayNhapVien: Yup.date()
            .nullable()
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .max(Yup.ref('denNgayNhapVien'), 'Ngày không được sau đến ngày nhập viện'),
        denNgayNhapVien: Yup.date()
            .nullable()
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .min(Yup.ref('tuNgayNhapVien'), 'Ngày họp không được trước từ ngày nhập viện'),
        tuNgayRaVien: Yup.date()
            .nullable()
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .max(Yup.ref('denNgayRaVien'), 'Ngày không được sau đến ngày đến ngày ra viện'),
        denNgayRaVien: Yup.date()
            .nullable()
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .min(Yup.ref('tuNgayRaVien'), 'Ngày họp không được trước từ ngày ra viện'),
        tuNgayLayMau: Yup.date()
            .nullable()
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .max(Yup.ref('denNgayLayMau'), 'Ngày không được sau đến ngày đến ngày lấy mẫu xét nghiệm'),
        denNgayLayMau: Yup.date()
            .nullable()
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .min(Yup.ref('tuNgayLayMau'), 'Ngày họp không được trước từ ngày lấy mẫu xét nghiệm'),
        tuNgayTraKetQuaXn: Yup.date()
            .nullable()
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .max(Yup.ref('denNgayTraKetQuaXn'), 'Ngày không được sau đến ngày đến ngày trả xét nghiệm'),
        denNgayTraKetQuaXn: Yup.date()
            .nullable()
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .min(Yup.ref('tuNgayTraKetQuaXn'), 'Ngày họp không được trước từ ngày trả mẫu xét nghiệm'),
    });

    return (
        <>
            <Formik
                initialValues={searchObject}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <Form>
                    {children}
                </Form>
            </Formik>
        </>
    );
};

export default FilterSearchContainer;
