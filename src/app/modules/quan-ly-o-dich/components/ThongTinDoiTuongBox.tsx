import { Col, Form, Row } from "react-bootstrap"
import LabelRequired from "../../component/LabelRequired"
import { OCTAutocomplete, OCTTextValidator } from "@oceantech/oceantech-ui"
import RadioGroup from "../../component/input-field/RadioGroup"
import { GENDER_OPTION } from "../../quan-ly-truong-hop-benh/const/constants"

const ThongTinDoiTuongBox = () => {
    return (
        <div className="section-container">
        <div className="spaces mb-10 fs-18 fw-bold text-uppercase color-dark-red">
            Thông tin đối tượng
        </div>
        <div className="border-top">
            <Row className="spaces mt-5">
                <Col xs={12} sm={12} md={12} lg={12} className="spaces mt-10">
                    <LabelRequired
                        isRequired
                        label="Mã số:"
                        className="spaces fw-500 mb-5"
                    />
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                    <LabelRequired
                        isRequired
                        label="Họ tên"
                        className="spaces fw-500 mb-5"
                    />
                    <OCTTextValidator
                        name="hoTen"
                        type="text"
                    />
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                    <div className="d-flex spaces gap-15">
                        <div>
                            <LabelRequired
                                isRequired
                                label="Ngày sinh"
                                className="spaces fw-500 mb-5"
                            />
                            <OCTTextValidator
                                className="spaces min-w-200"
                                name="trangThai"
                                type="date"
                            />
                        </div>
                        <div>
                            <LabelRequired
                                label="Tuổi"
                                className="spaces fw-500 mb-5"
                            />
                            <OCTTextValidator
                                name="tuoi"
                                type="text"
                                disabled
                            />
                        </div>
                    </div>
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                    <LabelRequired
                        isRequired
                        label="Nghề nghiệp"
                        className="spaces fw-500 mb-5"
                    />
                    <OCTAutocomplete
                        name="ngheNghiep"
                        options={[]}
                    />
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                    <LabelRequired
                        label="Nơi làm việc/Học tập"
                        className="spaces fw-500 mb-5"
                    />
                    <OCTTextValidator
                        name="hoTen"
                        type="text"
                    />
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                    <LabelRequired
                        isRequired
                        label="Dân tộc"
                        className="spaces fw-500 mb-5"
                    />
                    <OCTAutocomplete
                        name="danToc"
                        options={[]}
                    />
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                    <LabelRequired
                        isRequired
                        label="Giới tính"
                        className="spaces fw-500 mb-5"
                    />
                    <RadioGroup
                        name="danToc"
                        value={1} 
                        radioItemList={GENDER_OPTION} 
                        handleChange={() => {}}                   
                    />
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                    <LabelRequired
                        isRequired
                        label="CMND"
                        className="spaces fw-500 mb-5"
                    />
                    <OCTTextValidator
                        name="cmnd"
                        type="text"
                    />
                    <Form.Check
                        className='mt-2'
                        name='khongKhaiThacDuocCCCD'
                        label='Không khai thác được CCCD'
                        // checked={values.khongKhaiThacDuocCCCD}
                        // onChange={handleChange}
                    />
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                    <LabelRequired
                        label="Điện thoại"
                        className="spaces fw-500 mb-5"
                    />
                    <OCTTextValidator
                        name="dienThoai"
                    />
                    <Form.Check
                        className='mt-2'
                        label='Không khai thác được số điện thoại'
                        name='khongKhaiThacDuocSoDienThoai'
                        // checked={values.khongKhaiThacDuocSoDienThoai}
                        // onChange={handleChange}
                    />
                </Col>
            </Row>
            <Row className="spaces mt-10">
                <div className="fw-bold">Thông tin địa thường trú (địa chỉ hộ khẩu)</div>
                <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                    <LabelRequired
                        label="Địa chỉ thường trú"
                        className="spaces fw-500 mb-5"
                    />
                    <OCTTextValidator
                        name="diaChiThuongTru"
                        type="text"
                        placeholder="Nhập số nhà... Đường phố... Tổ/Xóm/Bản..."
                    />
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                    <LabelRequired
                        label="Tỉnh/TP thường trú"
                        className="spaces fw-500 mb-5"
                    />
                    <OCTAutocomplete
                        name="danToc"
                        options={[]}
                    />
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                    <LabelRequired
                        label="Quận/Huyện thường trú"
                        className="spaces fw-500 mb-5"
                    />
                    <OCTAutocomplete
                        name="danToc"
                        options={[]}
                    />
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                    <LabelRequired
                        label="Phường/Xã thường trú"
                        className="spaces fw-500 mb-5"
                    />
                    <OCTAutocomplete
                        name="danToc"
                        options={[]}
                    />
                </Col>
            </Row>
            <Row className="spaces mt-10">
                <div className="fw-bold">Thông tin địa chỉ nơi ở hiện nay</div>
                <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                    <LabelRequired
                        isRequired
                        label="Nơi ở hiện nay"
                        className="spaces fw-500 mb-5"
                    />
                    <OCTTextValidator
                        name="noiOHienTai"
                        type="text"
                        placeholder="Nhập số nhà... Đường phố... Tổ/Xóm/Bản..."
                    />
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                    <LabelRequired
                        isRequired
                        label="Tỉnh/TP"
                        className="spaces fw-500 mb-5"
                    />
                    <OCTAutocomplete
                        name="Tinh"
                        options={[]}
                    />
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                    <LabelRequired
                        isRequired
                        label="Quận/Huyện"
                        className="spaces fw-500 mb-5"
                    />
                    <OCTAutocomplete
                        name="Quan"
                        options={[]}
                    />
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                    <LabelRequired
                        isRequired
                        label="Phường/Xã"
                        className="spaces fw-500 mb-5"
                    />
                    <OCTAutocomplete
                        name="Huyen"
                        options={[]}
                    />
                </Col>
            </Row>
        </div>
    </div>
    )
}

export default ThongTinDoiTuongBox