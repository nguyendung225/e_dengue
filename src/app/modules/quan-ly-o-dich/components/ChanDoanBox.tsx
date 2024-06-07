import { OCTTextValidator } from "@oceantech/oceantech-ui";
import { useFormikContext } from "formik";
import { Col, Row } from "react-bootstrap";
import AsyncAutoComplete from "../../component/input-field/AsyncAutoComplete";
import RadioGroup from "../../component/input-field/RadioGroup";
import { CONFIG_BY_TYPE_TEST } from "../../quan-ly-truong-hop-benh/danh-sach-truong-hop-benh/config/config";
import { KHONG_LAY_MAU_XN, KQ_XET_NGHIEM, LAY_MAU_XN, LOAI_XET_NGHIEM, PCLD_XAC_DINH_PHONG_XET_NGHIEM, PHAN_LOAI_CHAN_DOAN, YES_NO_OPT } from "../../quan-ly-truong-hop-benh/danh-sach-truong-hop-benh/constants/constant";
import { getListCoSoDieuTri } from "../../services";
import { IThongTinODich } from "../models/quanLyODichModels";

const ChanDoanBox = () => {
    const { values, handleChange, errors, touched, setFieldValue, setValues } = useFormikContext<IThongTinODich>()
    const existTHB = Boolean(values?.doiTuongMacBenh?.doiTuongMacBenhId)

    const handleChangePhanLoaiChanDoan = (event: any) => {
        const newValue: IThongTinODich = {
            ...values, truongHopBenh: {
                ...values.truongHopBenh,
                phanLoaiChanDoan: event.target.value,
                layMauXetNghiem: event.target.value === PCLD_XAC_DINH_PHONG_XET_NGHIEM ? LAY_MAU_XN : values?.truongHopBenh?.layMauXetNghiem
            }
        }
        setValues(newValue)
    }

    const handleChangeLayMauXN = (event: any) => {
        const newValue: IThongTinODich = {
            ...values, truongHopBenh: {
                ...values.truongHopBenh,
                layMauXetNghiem: event?.target?.value,
                loaiXetNghiem: null,
                dinhLoaiXetNghiemKhac: "",
                loaiXetNghiemKhac: "",
                ketQuaXetNghiem: null,
                ngayThucHienXn: null,
                ngayTraKetQuaXn: null,
                donViXetNghiem: null,
                donViXetNghiemObject: null,
            }
        }
        setValues(newValue)
    }

    const handleChangeLoaiXetNghiem = (event: any) => {
        const newValue: IThongTinODich = {
            ...values, truongHopBenh: {
                ...values.truongHopBenh,
                loaiXetNghiem: event?.target?.value,
                dinhLoaiXetNghiemKhac: "",
                loaiXetNghiemKhac: "",
            }
        }
        setValues(newValue)
    }

    const disabledFieldLayMauXN = values?.truongHopBenh?.phanLoaiChanDoan === PCLD_XAC_DINH_PHONG_XET_NGHIEM ? [KHONG_LAY_MAU_XN] : []
    const configByTypeTest = CONFIG_BY_TYPE_TEST[values?.truongHopBenh?.loaiXetNghiem as any]

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
                            value={values?.truongHopBenh?.phanLoaiChanDoan}
                            radioItemList={PHAN_LOAI_CHAN_DOAN}
                            handleChange={handleChangePhanLoaiChanDoan}
                            disabled={existTHB}
                        />
                        <div className="spaces my-5 fw-bold">Chẩn đoán bệnh kèm theo</div>
                        <OCTTextValidator
                            type="text"
                            value={values?.truongHopBenh?.benhChanDoanPhu}
                            name={"truongHopBenh.benhChanDoanPhu"}
                            onChange={handleChange}
                            disabled={existTHB}
                            as="textarea"
                            rows={2}
                        />
                        <div className="spaces my-5 fw-bold">Ghi chú</div>
                        <OCTTextValidator
                            type="text"
                            as="textarea"
                            rows={2}
                            value={values?.truongHopBenh?.ghiChu}
                            name={"truongHopBenh.ghiChu"}
                            onChange={handleChange}
                            disabled={existTHB}
                        />
                        <div className="spaces my-5 fw-bold">Chẩn đoán biến chứng</div>
                        <OCTTextValidator
                            type="text"
                            as="textarea"
                            rows={2}
                            value={values?.truongHopBenh?.chanDoanBienChung}
                            name={"truongHopBenh.chanDoanBienChung"}
                            onChange={handleChange}
                            disabled={existTHB}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6}>
                        <div className="spaces mt-5 fw-bold">Lấy mẫu xét nghiệm chẩn đoán</div>
                        <RadioGroup
                            name='truongHopBenh.layMauXetNghiem'
                            value={values?.truongHopBenh?.layMauXetNghiem}
                            radioItemList={YES_NO_OPT}
                            handleChange={handleChangeLayMauXN}
                            disabled={existTHB}
                            disabledFields={existTHB ? YES_NO_OPT.map(item => item.code) : disabledFieldLayMauXN}
                        />
                        {
                            values?.truongHopBenh?.layMauXetNghiem === LAY_MAU_XN && (
                                <>
                                    <div className="spaces my-5 fw-bold">Thời gian, đơn vị thực hiện</div>
                                    <Row>
                                        <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                                            <OCTTextValidator
                                                lable="Ngày lấy mẫu"
                                                type="date"
                                                name="truongHopBenh.ngayThucHienXn"
                                                isRequired
                                                value={values?.truongHopBenh?.ngayThucHienXn}
                                                onChange={handleChange}
                                                errors={errors?.truongHopBenh?.ngayThucHienXn}
                                                touched={touched?.truongHopBenh?.ngayThucHienXn}
                                                disabled={existTHB}

                                            />
                                        </Col>
                                        <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                                            <AsyncAutoComplete
                                                params={{}}
                                                required
                                                displayField='tenCoSo'
                                                label="Đơn vị xét nghiệm"
                                                service={getListCoSoDieuTri}
                                                handleChange={(value) => setFieldValue("truongHopBenh.donViXetNghiemObject", value)}
                                                nameErrorMessage={errors?.truongHopBenh?.donViXetNghiemObject as string}
                                                touched={touched?.truongHopBenh?.donViXetNghiemObject}
                                                value={values.truongHopBenh?.donViXetNghiemObject}
                                                isDisabled={existTHB}
                                            />
                                        </Col>
                                        <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                                            <OCTTextValidator
                                                lable="Ngày trả kết quả"
                                                type="date"
                                                name="truongHopBenh.ngayTraKetQuaXn"
                                                value={values?.truongHopBenh?.ngayTraKetQuaXn}
                                                onChange={handleChange}
                                                disabled={existTHB}
                                            />
                                        </Col>
                                    </Row>
                                    <div className="spaces my-5 fw-bold">Loại xét nghiệm</div>
                                    <RadioGroup
                                        name={"loaiXetNghiem"}
                                        value={values?.truongHopBenh?.loaiXetNghiem}
                                        radioItemList={LOAI_XET_NGHIEM}
                                        handleChange={handleChangeLoaiXetNghiem}
                                        disabled={existTHB}
                                    />
                                    <Row>
                                        <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                                            {configByTypeTest?.tenXetNghiemKhac && (
                                                <OCTTextValidator
                                                    lable="Tên xét nghiệm"
                                                    type="text"
                                                    isRequired
                                                    name="truongHopBenh.loaiXetNghiemKhac"
                                                    value={values?.truongHopBenh?.loaiXetNghiemKhac}
                                                    onChange={handleChange}
                                                    errors={errors?.truongHopBenh?.loaiXetNghiemKhac}
                                                    touched={touched?.truongHopBenh?.loaiXetNghiemKhac}
                                                    disabled={existTHB}
                                                />
                                            )}
                                        </Col>
                                        <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                                            {configByTypeTest?.dinhLoai && (
                                                <OCTTextValidator
                                                    lable="Đinh loại"
                                                    type="text"
                                                    name="truongHopBenh.dinhLoaiXetNghiemKhac"
                                                    value={values?.truongHopBenh?.dinhLoaiXetNghiemKhac}
                                                    onChange={handleChange}
                                                    disabled={existTHB}
                                                />
                                            )}
                                        </Col>
                                    </Row>
                                    <div className="spaces my-5 fw-bold">Kết quả xét nghiệm</div>
                                    <RadioGroup
                                        name={"truongHopBenh.ketQuaXetNghiem"}
                                        value={values?.truongHopBenh?.ketQuaXetNghiem}
                                        radioItemList={KQ_XET_NGHIEM}
                                        disabled={existTHB}
                                        handleChange={handleChange}
                                    />
                                </>
                            )
                        }
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ChanDoanBox