import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Button, Modal } from "react-bootstrap";
import { Col, Row } from "../../../component/Grid";
import { OCTAutocomplete, OCTTextValidator } from "@oceantech/oceantech-ui";
import { BenhReport, INITIAL_BENH_REPORT, TRANG_THAI_PHAN_HOI } from "../constants/constant";
import { TruongHopBenh } from "../model/Model";
import { XAC_NHAN_THB } from "../constants/constant";
import { regex } from "../../../constant";
import { updateXacNhanTrangThaiTHB } from "../servives/Services";
import { toast } from "react-toastify";
import { RESPONSE_STATUS_CODE } from "../../../utils/Constant";
import { useContext, useState } from "react";
import AppContext from "../../../../AppContext";
import ModalChonToaDo from "../../../component/map/ModalChonToaDo";

type TProps = {
    handleClose: () => void;
    dataRow?: TruongHopBenh;
    updatePageData: () => void;
};

const ModalXacNhanTHB = (props: TProps) => {
    const [openChonToaDo, setOpenChonToaDo] = useState(false);
    const { dataRow, handleClose, updatePageData } = props;
    const { setPageLoading } = useContext(AppContext);
    const benhReportSchema = Yup.object().shape({
        hoTenNguoiBaoCao: Yup.string().required("Bắt buộc nhập").nullable(),
        trangThaiXacNhanThb: Yup.number().required("Bắt buộc nhập").nullable(),
        dienThoaiNguoiBaoCao: Yup.string()
          .required("Bắt buộc nhập")
          .nullable()
          .matches(regex.phone, "Số điện thoại không hợp lệ"),
    });

    const handleSubmit = async (values: any) => {
        const formData = {
          ...values,
          truongHopBenhId:  dataRow?.truongHopBenh?.truongHopBenhId,
        };

        try {
          setPageLoading(true);
          const { data } = await updateXacNhanTrangThaiTHB(formData.truongHopBenhId as number, formData);

          if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
            toast.success("Cập nhật trường hợp bệnh thành công");
            updatePageData();
            handleClose();
            return;
          }

           toast.warning(data?.message);
        } catch (error) {
          toast.error(error as string);
        } finally {
          setPageLoading(false);
        }
    };

    const handleChangeLoaiXacNhan = (setValues: Function, selectedOption: string) => {
        setValues((prev: BenhReport) => {
            return {
                ...prev,
                trangThaiXacNhanThb: selectedOption,
                kinhDo: null,
                viDo: null
            }
        })
    }

    return (
        <Modal
            show
            onHide={handleClose}
            centered
            animation
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <span className="spaces pl-16">
                        Xác nhận trường hợp bệnh
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={INITIAL_BENH_REPORT}
                    validationSchema={benhReportSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ values, errors, touched, handleChange, setValues }) => (
                        <Form>
                            <Row>
                                <Col xs={4}>
                                    <OCTAutocomplete
                                        lable="Loại xác nhận"
                                        options={XAC_NHAN_THB}
                                        name="trangThaiXacNhanThb"
                                        value={values.trangThaiXacNhanThb}
                                        onChange={(selectedOption) => {
                                            handleChangeLoaiXacNhan(setValues, selectedOption?.code);
                                        }}
                                        isRequired
                                        errors={errors.trangThaiXacNhanThb}
                                        touched={touched.trangThaiXacNhanThb}
                                    />
                                </Col>
                                <Col xs={4}>
                                    <OCTTextValidator
                                        lable="Họ tên người báo cáo"
                                        type="text"
                                        isRequired
                                        name="hoTenNguoiBaoCao"
                                        value={values.hoTenNguoiBaoCao}
                                        onChange={handleChange}
                                        errors={errors.hoTenNguoiBaoCao}
                                        touched={touched.hoTenNguoiBaoCao}
                                    />
                                </Col>
                                <Col xs={4}>
                                    <OCTTextValidator
                                        lable="Điện thoại người báo cáo"
                                        type="text"
                                        isRequired
                                        name="dienThoaiNguoiBaoCao"
                                        value={values.dienThoaiNguoiBaoCao}
                                        onChange={handleChange}
                                        errors={errors.dienThoaiNguoiBaoCao}
                                        touched={touched.dienThoaiNguoiBaoCao}
                                    />
                                </Col>
                                {
                                    (values?.trangThaiXacNhanThb === TRANG_THAI_PHAN_HOI.DA_XN_DUNG) &&
                                    <>
                                        <Col xs={4}>
                                            <OCTTextValidator
                                                lable="Kinh độ"
                                                type="text"
                                                isRequired
                                                name="dienThoaiNguoiBaoCao"
                                                value={values.kinhDo}
                                                disabled
                                            />
                                        </Col>
                                        <Col xs={4}>
                                            <OCTTextValidator
                                                lable="Vĩ độ"
                                                type="text"
                                                isRequired
                                                name="dienThoaiNguoiBaoCao"
                                                value={values.viDo}
                                                disabled

                                            />
                                        </Col>
                                        <Col xs={4}>
                                            <div className="h-100 d-flex align-items-end">
                                                <Button className="button-primary" onClick={() => {
                                                    setOpenChonToaDo(true)
                                                }}>Chọn tọa độ</Button>
                                            </div>
                                        </Col>
                                    </>
                                }
                                <Col xs={12}>
                                    <OCTTextValidator
                                        lable="Mô tả"
                                        type="text"
                                        name="moTa"
                                        value={values.moTa}
                                        as="textarea"
                                        rows={4}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <div className="d-flex gap-2 justify-content-end">
                                        <Button
                                            type="submit"
                                            className="button-primary"
                                        > Lưu
                                        </Button>
                                        <Button
                                            className="button-primary"
                                            onClick={handleClose}
                                        > Đóng
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                            {
                                openChonToaDo && <ModalChonToaDo
                                    handleClose={() => setOpenChonToaDo(false)}
                                />
                            }
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

export default ModalXacNhanTHB;