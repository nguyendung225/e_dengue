import { Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import TabMenu from "../../../component/tabs/TabMenu";
import { hanhChinhSchema, KeyTab, tabConfig, tabTruongHopBenh } from "../constants/constant";
import { TruongHopBenh } from "../model/Model";
import { AddTruongHopBenh, updateTruongHopBenh } from "../servives/Services";

type TProps = {
    handleClose: () => void;
    dataRow?: any;
    updatePageData: () => void;
};

const NhapTruongHopBenhModal = (props: TProps) => {
    const { dataRow, handleClose, updatePageData } = props;
    const [activeTab, setActiveTab] = useState(KeyTab.TT_HANH_CHINH)
    const [validationSchema, setValidationSchema] = useState(hanhChinhSchema);
    const [prevTab, setPrevTab] = useState<any>(null)

    useEffect(() => {
        const { schema, prevTab } = tabConfig[activeTab] || {};
        setValidationSchema(schema || null);
        setPrevTab(prevTab || null);
    }, [activeTab]);

    const formatData = (data: TruongHopBenh): TruongHopBenh => {
        const {
			donViXetNghiemObject,
			coSoDieuTri,
			coSoQuanLy,
			benhVienChuyenToi,
			donViCongTacNbc,
			benhVienChuyenToiTen,
            capDoBenh,
			capDoBenhRaVien,
			capDoBenhTen,
			coSoQuanLyTen,
			coSoDieuTriTen,
			capDoBenhRaVienTen,
			donViXetNghiemTen,
			donViCongTacNbcTen,
			...thbRest
		} = data.truongHopBenh;

        const {
            ngheNghiep,
            danToc,
            huyenHienNay,
            tinhHienNay, 
            xaHienNay,
            tinhThuongTru,
            huyenThuongTru,
            xaThuongTru,
            danTocTen,
            ngheNghiepTen,
            huyenTenHienNay,
            huyenTenThuongTru,
            xaTenThuongTru,
            xaTenHienNay,
            tinhTenHienNay,
            tinhTenThuongTru,
            ...dtbmRest
        } = data.doiTuongMacBenh;

        return {
            truongHopBenh: {
                ...thbRest,
                capDoBenhId: data?.truongHopBenh?.capDoBenh?.id,
                benhVienChuyenToiId: data?.truongHopBenh?.benhVienChuyenToi?.id,
                donViXetNghiem: data?.truongHopBenh?.donViXetNghiemObject?.id,
                coSoDieuTriId: data?.truongHopBenh?.coSoDieuTri?.id,
                coSoQuanLyId: data?.truongHopBenh?.coSoQuanLy?.id,
                donViCongTacNbcId: data?.truongHopBenh?.donViCongTacNbc?.id,
                capDoBenhRaVienId: data?.truongHopBenh?.capDoBenhRaVien?.id
            },
            doiTuongMacBenh: {
                ...dtbmRest,
                ngheNghiepId: data?.doiTuongMacBenh?.ngheNghiep?.id,
                danTocId: data?.doiTuongMacBenh?.danToc?.id,
                huyenIdHienNay: data?.doiTuongMacBenh?.huyenHienNay?.id,
                xaIdHienNay: data?.doiTuongMacBenh?.xaHienNay?.xaId,
                tinhIdHienNay: data?.doiTuongMacBenh?.tinhHienNay?.id,
                tinhIdThuongTru: data?.doiTuongMacBenh?.tinhThuongTru?.id,
                huyenIdThuongTru: data?.doiTuongMacBenh?.huyenThuongTru?.id,
                xaIdThuongTru: data?.doiTuongMacBenh?.xaThuongTru?.xaId,
            }
        }

    }

    const handleSubmit = async (values: TruongHopBenh, formikHelpers: FormikHelpers<TruongHopBenh>) => {
        const { nextTab } = tabConfig[activeTab] || {};
        const id = values?.truongHopBenh?.truongHopBenhId
        const formData = formatData(values)
        if (nextTab) {
            setActiveTab(nextTab);
        } else {
            id ? await updateTruongHopBenh(id, formData) : await AddTruongHopBenh(formData)
            toast.success(`${id ? "Cập nhật" : "Thêm"} trường hợp bệnh thành công`);
            updatePageData();
            handleClose();
        }
    };

    return (
        <Modal
            show
            onHide={handleClose}
            centered
            animation
            size="xl"
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <span className="spaces pl-16">
                        {dataRow?.truongHopBenh.truongHopBenhId ? "#Cập nhật" : "#Thêm mới"} trường hợp bệnh
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Formik
                initialValues={dataRow}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {formikProps => (
                    <Form noValidate>
                        <Modal.Body className="noiDungTruongHopBenh">
                            <TabMenu
                                danhsachTabs={tabTruongHopBenh}
                                setCurrentTab={setActiveTab}
                                defaultActiveKey={activeTab}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <div className='d-flex justify-content-between w-100'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='fw-bold'>Lưu ý các dấu <span className='text-danger'>* </span> là trường bắt buộc nhập</div>
                                </div>
                                <div className="d-flex gap-2">
                                    {
                                        prevTab &&
                                        <Button
                                            className="button-primary"
                                            onClick={() => setActiveTab(prevTab)}>
                                            Quay lại
                                        </Button>
                                    }
                                    <Button
                                        className="button-primary"
                                        type="submit">
                                        {activeTab === KeyTab.TT_GHI_NHAN ? "Lưu" : "Tiếp tục"}
                                    </Button>
                                </div>
                            </div>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
}

export default NhapTruongHopBenhModal;