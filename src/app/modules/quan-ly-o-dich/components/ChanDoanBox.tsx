import { Col, Row } from "react-bootstrap";
import RadioGroup from "../../component/input-field/RadioGroup";
import { OCTTextArea, OCTTextValidator } from "@oceantech/oceantech-ui";
import LabelRequired from "../../component/LabelRequired";

const PHAN_LOAI_CHAN_DOAN_OPTIONS = [
    { name: "Nghi ngờ (Lâm sàng)", code: "1" },
    { name: "Có thể", code: "2" },
    { name: "Xác định phòng xét nghiệm", code: "3" },
]

const LOAI_XET_NGHIEM_OPTIONS = [
    { name: "Test nhanh", code: "1" },
    { name: "Mac-elisa", code: "2" },
    { name: "PCR", code: "3" },
    { name: "Loại khác", code: "4" },
]

const KET_QUA_XN_OPTIONS = [
    { name: "Dương tính", code: "1" },
    { name: "Âm tính", code: "2" },
    { name: "Chưa có kết quả", code: "3" },
]

const ChanDoanBox = () => {
    return (
        <div className="section-container">
            <div className="spaces mb-10 fs-18 fw-bold text-uppercase color-dark-red">
                Chẩn đoán
            </div>
            <div className="border-top spaces pt-10">
                <Row>
                    <Col xs={12} sm={6} md={6} lg={6}>
                        <div className="spaces mb-5 fw-bold">Phân loại chẩn đoán trường hợp bệnh</div>
                        <RadioGroup
                            name={"phanLoaiChanDoan"}
                            value={1}
                            radioItemList={PHAN_LOAI_CHAN_DOAN_OPTIONS}
                            handleChange={() => { }}
                        />
                        <div className="spaces my-5 fw-bold">Phân loại chẩn đoán trường hợp bệnh</div>
                        <OCTTextArea
                            row={3}
                            as="textarea"
                            name="tienXuDichTe"
                            placeholder="Mô tả bệnh đi kèm bệnh chẩn đoán chính"
                            onChange={() => { }}
                        />
                        <div className="spaces my-5 fw-bold">Ghi chú</div>
                        <OCTTextArea
                            row={3}
                            as="textarea"
                            name="tienXuDichTe"
                            placeholder="Mô tả chi tiết thông tin trường hợp bệnh"
                            onChange={() => { }}
                        />
                        <div className="spaces my-5 fw-bold">Chẩn đoán biến chứng</div>
                        <OCTTextArea
                            row={3}
                            as="textarea"
                            name="tienXuDichTe"
                            placeholder="Mô tả biến chứng"
                            onChange={() => { }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6}>
                        <div className="spaces mt-5 fw-bold">Lấy mẫu xét nghiệm chẩn đoán</div>
                        <RadioGroup
                            name={"phanLoaiChanDoan"}
                            value={1}
                            radioItemList={PHAN_LOAI_CHAN_DOAN_OPTIONS}
                            handleChange={() => { }}
                        />
                        <div className="spaces my-5 fw-bold">Phân loại chẩn đoán trường hợp bệnh</div>
                        <Row>
                            <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                                <LabelRequired
                                    isRequired
                                    label="Ngày lấy mẫu"
                                    className="spaces fw-500 mb-5"
                                />
                                <OCTTextValidator
                                    name="ngayLayMau"
                                    type="date"
                                />
                            </Col>
                            <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                                <LabelRequired
                                    label="Đơn vị"
                                    className="spaces fw-500 mb-5"
                                />
                                <OCTTextValidator
                                    name="donVi"
                                    type="text"
                                    placeholder="Nhập tên hoặc mã đơn vị"
                                />
                            </Col>
                            <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                                <LabelRequired
                                    label="Ngày trả kết quả xét nghiệm"
                                    className="spaces fw-500 mb-5"
                                />
                                <OCTTextValidator
                                    name="ngayTraKetQuaXN"
                                    type="date"
                                />
                            </Col>
                        </Row>
                        <div className="spaces my-5 fw-bold">Loại xét nghiệm</div>
                        <RadioGroup
                            name={"loaiXetNghiem"}
                            value={1}
                            radioItemList={LOAI_XET_NGHIEM_OPTIONS}
                            handleChange={() => { }}
                        />
                        <Row>
                            <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                                <LabelRequired
                                    isRequired
                                    label="Tên xét nghiệm"
                                    className="spaces fw-500 mb-5"
                                />
                                <OCTTextValidator
                                    name="tenXetNghiem"
                                    type="text"
                                    placeholder="Tên loại xét nghiệm"
                                />
                            </Col>
                            <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                                <LabelRequired
                                    label="Định loại"
                                    className="spaces fw-500 mb-5"
                                />
                                <OCTTextValidator
                                    name="dinhLoai"
                                    type="text"
                                    placeholder="Định loại xét nghiệm"
                                />
                            </Col>
                        </Row>
                        <div className="spaces my-5 fw-bold">Kết quả xét nghiệm</div>
                        <RadioGroup
                            name={"loaiXetNghiem"}
                            value={1}
                            radioItemList={KET_QUA_XN_OPTIONS}
                            handleChange={() => { }}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ChanDoanBox