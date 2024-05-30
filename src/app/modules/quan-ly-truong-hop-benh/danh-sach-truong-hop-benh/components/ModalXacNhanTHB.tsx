import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Button, Modal } from "react-bootstrap";
import { Col, Row } from "../../../component/Grid";
import { OCTAutocomplete, OCTTextValidator } from "@oceantech/oceantech-ui";
import { initialBenhReport } from "../model/Model";

type TProps = {
    handleClose: () => void;
    dataRow?: any;
};

const ModalXacNhanTHB = (props: TProps) => {
    const { dataRow, handleClose } = props;

    const benhReportSchema = Yup.object().shape({
        hoTenNguoiBaoCao: Yup.string().required('Bắt buộc nhập').nullable(),
        trangThaiXacNhanThb: Yup.number().required('Bắt buộc nhập').nullable(),
        dienThoaiNguoiBaoCao: Yup.string().required('Bắt buộc nhập').nullable(),
        moTa: Yup.string()
    });

    const handleSubmit = async (values: any) => {

    };

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
                    initialValues={initialBenhReport}
                    validationSchema={benhReportSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange }) => (
                        <Form>
                            <Row>
                                <Col xs={4}>
                                    <OCTAutocomplete
                                        lable="Loại xác nhận"
                                        options={[]}
                                        name="trangThaiXacNhanThb"
                                        value={values.trangThaiXacNhanThb}
                                        onChange={handleChange}
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


                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

export default ModalXacNhanTHB;