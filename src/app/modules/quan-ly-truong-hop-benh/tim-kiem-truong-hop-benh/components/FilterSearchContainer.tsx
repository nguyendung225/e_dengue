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
        tuNgayNhapBaoCao: Yup.date()
            .nullable()
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .max(Yup.ref('denNgayNhapBaoCao'), 'Ngày không được sau ngày nhập báo cáo đến'),
        denNgayNhapBaoCao: Yup.date()
            .nullable()
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .min(Yup.ref('tuNgayNhapBaoCao'), 'Ngày không được trước ngày nhập báo cáo từ'),
        tuNgayKhoiPhat: Yup.date()
            .nullable()
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .max(Yup.ref('denNgayKhoiPhat'), 'Ngày không được sau ngày khởi phát đến'),
        denNgayKhoiPhat: Yup.date()
            .nullable()
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .min(Yup.ref('tuNgayKhoiPhat'), 'Ngày không được trước ngày khởi phát từ'),
        tuNgayNhapVien: Yup.date()
            .nullable()
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .max(Yup.ref('denNgayNhapVien'), 'Ngày không được sau ngày nhập viện đến'),
        denNgayNhapVien: Yup.date()
            .nullable()
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .min(Yup.ref('tuNgayNhapVien'), 'Ngày không được trước ngày nhập viện từ'),
        tuNgayRaVien: Yup.date()
            .nullable()
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .max(Yup.ref('denNgayRaVien'), 'Ngày không được sau ngày ngày ra viện/tử vong đến'),
        denNgayRaVien: Yup.date()
            .nullable()
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .min(Yup.ref('tuNgayRaVien'), 'Ngày không được trước ngày ra viện/tử vong từ'),
        tuNgayLayMau: Yup.date()
            .nullable()
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .max(Yup.ref('denNgayLayMau'), 'Ngày không được sau ngày lấy mẫu xét nghiệm đến'),
        denNgayLayMau: Yup.date()
            .nullable()
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .min(Yup.ref('tuNgayLayMau'), 'Ngày không được trước ngày lấy mẫu xét nghiệm từ'),
        tuNgayTraKetQuaXn: Yup.date()
            .nullable()
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .max(Yup.ref('denNgayTraKetQuaXn'), 'Ngày không được sau ngày trả kết quả đến'),
        denNgayTraKetQuaXn: Yup.date()
            .nullable()
            .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
            .min(Yup.ref('tuNgayTraKetQuaXn'), 'Ngày không được trước ngày trả kết quả từ'),
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
