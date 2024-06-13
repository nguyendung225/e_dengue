import { OCTTextValidator } from "@oceantech/oceantech-ui"
import { useFormikContext } from "formik"
import { Col, Row } from "react-bootstrap"
import { IThongTinODich } from "../models/quanLyODichModels"

const KetThucODichBox = () => {
    const { values, errors, touched, handleChange } = useFormikContext<IThongTinODich>()

    return (
        <div className="section-container">
            <div className="spaces mb-10 fs-18 fw-bold text-uppercase color-dark-red">
                Thông tin kết thúc ổ dịch
            </div>
            <div className="border-top">
                <Row>
                    <Col xs={3} className="spaces mt-16">
                        <OCTTextValidator
                            lable="Ngày khởi phát trường hợp bệnh đầu tiên"
                            name="oDich.ngayKhoiPhatThbDauTien"
                            value={values?.oDich?.ngayKhoiPhatThbDauTien}
                            onChange={handleChange}
                            disabled
                            isRequired
                            type="date"
                        />
                    </Col>
                    <Col xs={3} className="spaces mt-16">
                        <OCTTextValidator
                            lable="Ngày nhận báo cáo ổ dịch bệnh đầu tiên"
                            name="oDich.ngayNhanBaoCao"
                            value={values?.oDich?.ngayNhanBaoCao}
                            onChange={handleChange}
                            errors={errors?.oDich?.ngayNhanBaoCao}
                            touched={touched?.oDich?.ngayNhanBaoCao}
                            isRequired
                            type="date"
                        />
                    </Col>
                    <Col xs={3} className="spaces mt-16">
                        <OCTTextValidator
                            lable="Ngày khởi phát trường hợp bệnh cuối cùng"
                            name="oDich.ngayKhoiPhatThbCuoiCung"
                            value={values?.oDich?.ngayKhoiPhatThbCuoiCung}
                            onChange={handleChange}
                            errors={errors?.oDich?.ngayKhoiPhatThbCuoiCung}
                            touched={touched?.oDich?.ngayKhoiPhatThbCuoiCung}
                            isRequired
                            type="date" />
                    </Col>
                    <Col xs={3} className="spaces mt-16">
                        <OCTTextValidator
                            lable="Ngày ổ dịch kết thúc hoạt động"
                            name="oDich.ngayKetThucODich"
                            value={values?.oDich?.ngayKetThucODich}
                            onChange={handleChange}
                            errors={errors?.oDich?.ngayKetThucODich}
                            touched={touched?.oDich?.ngayKetThucODich}
                            isRequired
                            type="date"
                        />
                    </Col>
                    <Col xs={4} className="spaces mt-16">
                        <OCTTextValidator
                            lable="Tổng số (số mắc)"
                            name="oDich.soMacTong"
                            value={values?.oDich?.soMacTong}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs={4} className="spaces mt-16">
                        <OCTTextValidator
                            lable="Số mẫu xét nghiệm (số mắc)"
                            name="oDich.soMacXn"
                            value={values?.oDich?.soMacXn}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs={4} className="spaces mt-16">
                        <OCTTextValidator
                            lable="Số mẫu dương tính (số mắc)"
                            name="oDich.soMacDuongTinh"
                            value={values?.oDich?.soMacDuongTinh}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs={4} className="spaces mt-16">
                        <OCTTextValidator
                            lable="Tổng số (số tử vong)"
                            name="oDich.soChetTong"
                            value={values?.oDich?.soChetTong}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs={4} className="spaces mt-16">
                        <OCTTextValidator
                            lable="Số mẫu xét nghiệm (số tử vong)"
                            name="oDich.soChetXn"
                            value={values?.oDich?.soChetXn}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs={4} className="spaces mt-16">
                        <OCTTextValidator
                            lable="Số mẫu dương tính (số tử vong)"
                            name="oDich.soChetDuongTinh"
                            value={values?.oDich?.soChetDuongTinh}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs={4} className="spaces mt-16">
                        <OCTTextValidator
                            lable="Hoạt động chính đã triển khai"
                            name="oDich.ngayKhoiPhatThbDauTien"
                            as="textarea"
                            rows={2}
                            value={values?.oDich?.hoatDongChinh}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs={4} className="spaces mt-16">
                        <OCTTextValidator
                            lable="Mô tả đặc điểm các chùm ca bệnh (nếu có)"
                            name="oDich.ngayKhoiPhatThbDauTien"
                            as="textarea"
                            rows={2}
                            value={values?.oDich?.moTaTomTat}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs={4} className="spaces mt-16">
                        <OCTTextValidator
                            lable="Các yếu tố nguy cơ/dịch tễ liên quan"
                            name="oDich.ngayKhoiPhatThbDauTien"
                            as="textarea"
                            rows={2}
                            value={values?.oDich?.cacYeuToNguyCo}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs={6} className="spaces mt-16">
                        <OCTTextValidator
                            lable="Số vật tư, kinh phí đã qua sử dụng"
                            name="oDich.ngayKhoiPhatThbDauTien"
                            as="textarea"
                            rows={2}
                            value={values?.oDich?.vatTuKinhPhi}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs={6} className="spaces mt-16">
                        <OCTTextValidator
                            lable="Thuận lợi, khó khăn, hiệu quả các biện pháp (nêu cụ thể, chi tiết)"
                            name="oDich.ngayKhoiPhatThbDauTien"
                            as="textarea"
                            rows={2}
                            value={values?.oDich?.thuanLoiKhoKhan}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs={6} className="spaces mt-16">
                        <OCTTextValidator
                            lable="Nhận xét và bài học kinh nghiệm"
                            name="oDich.ngayKhoiPhatThbDauTien"
                            as="textarea"
                            rows={2}
                            value={values?.oDich?.nhanXetVaBaiHoc}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col xs={6} className="spaces mt-16">
                        <OCTTextValidator
                            lable="Ý kiến đề nghị"
                            name="oDich.ngayKhoiPhatThbDauTien"
                            as="textarea"
                            rows={2}
                            value={values?.oDich?.yKienDeNghi}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default KetThucODichBox