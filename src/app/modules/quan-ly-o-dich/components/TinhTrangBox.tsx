import { OCTTextValidator } from "@oceantech/oceantech-ui"
import { useFormikContext } from "formik"
import { Col, Row } from "react-bootstrap"
import AsyncAutoComplete from "../../component/input-field/AsyncAutoComplete"
import RadioGroup from "../../component/input-field/RadioGroup"
import { CONFIG_BY_CURRENT_STATUS } from "../../quan-ly-truong-hop-benh/danh-sach-truong-hop-benh/config/config"
import { TINH_TRANG_HIEN_NAY } from "../../quan-ly-truong-hop-benh/danh-sach-truong-hop-benh/constants/constant"
import { getListCoSoDieuTri } from "../../services"
import { IThongTinODich } from "../models/quanLyODichModels"
import TextValidator from "../../component/input-field/TextValidator"

const TinhTrangBox = () => {
    const { values, handleChange, errors, touched, setFieldValue, setValues } = useFormikContext<IThongTinODich>()
    const existTHB = Boolean(values?.doiTuongMacBenh?.doiTuongMacBenhId)
    const configByStatus = CONFIG_BY_CURRENT_STATUS[values?.truongHopBenh?.tinhTrangHienNay as any]

    const handleChangeTinhTrangHienNay = (event: any) => {
        const newValue: IThongTinODich = {
            ...values, truongHopBenh: {
                ...values.truongHopBenh,
                tinhTrangHienNay: event.target.value,
                chanDoanRaVien: "",
                benhVienChuyenToiId: null,
                benhVienChuyenToi: null,
                tinhTrangKhac: null
            }
        }
        setValues(newValue)
    }

    return (
        <div className="section-container">
            <div className="spaces mb-10 fs-18 fw-bold text-uppercase color-dark-red">
                Tình trạng
            </div>
            <div className="border-top spaces pt-10">
                <Row>
                    <Col xs={12} sm={6} md={6} lg={6}>
                        <RadioGroup
                            name={"tinhTrangHienNay"}
                            value={values?.truongHopBenh?.tinhTrangHienNay}
                            groupContainerClassName="d-flex flex-column"
                            radioItemList={TINH_TRANG_HIEN_NAY}
                            handleChange={handleChangeTinhTrangHienNay}
                            disabled={existTHB}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6}>
                        <div>
                            <TextValidator
                                lable="Ngày khởi phát"
                                type="date"
                                name="truongHopBenh.ngayKhoiPhat"
                                value={values.truongHopBenh?.ngayKhoiPhat}
                                onChange={handleChange}
                                isRequired={configByStatus?.ngayKhoiPhat?.require}
                                errors={errors?.truongHopBenh?.ngayKhoiPhat}
                                touched={touched?.truongHopBenh?.ngayKhoiPhat}
                                disabled={existTHB}
                            />
                        </div>
                        <div className="spaces mt-10">
                            <TextValidator
                                lable="Ngày N.Viện/khám"
                                type="date"
                                isRequired
                                name="truongHopBenh.ngayNhapVien"
                                value={values.truongHopBenh?.ngayNhapVien}
                                onChange={handleChange}
                                errors={errors?.truongHopBenh?.ngayNhapVien}
                                touched={touched?.truongHopBenh?.ngayNhapVien}
                                disabled={existTHB}
                            />
                        </div>
                        <div className="spaces mt-10">
                            <TextValidator
                                lable="Ngày ra viện/chuyển viện/tử vong"
                                type="date"
                                name="truongHopBenh.ngayRaVien"
                                onChange={handleChange}
                                value={values.truongHopBenh?.ngayRaVien}
                                disabled={configByStatus?.ngayRaVienChuyenVienTuVong?.disabled || existTHB}
                                isRequired={configByStatus?.ngayRaVienChuyenVienTuVong?.require}
                                errors={errors?.truongHopBenh?.ngayRaVien}
                                touched={touched?.truongHopBenh?.ngayRaVien}
                            />
                        </div>
                        <div className="spaces mt-10">
                            {configByStatus?.chanDoanRaVien && (
                                <OCTTextValidator
                                    lable="Chẩn đoán ra viện"
                                    type="text"
                                    isRequired
                                    name="truongHopBenh.chanDoanRaVien"
                                    value={values.truongHopBenh?.chanDoanRaVien}
                                    onChange={handleChange}
                                    errors={errors?.truongHopBenh?.chanDoanRaVien}
                                    touched={touched?.truongHopBenh?.chanDoanRaVien}
                                    disabled={existTHB}
                                />
                            )}
                            {configByStatus?.chuyenToi && (
                                <AsyncAutoComplete
                                    params={{}}
                                    required
                                    displayField='tenCoSo'
                                    label="Chuyển tới"
                                    service={getListCoSoDieuTri}
                                    handleChange={(value) => setFieldValue('truongHopBenh.benhVienChuyenToi', value)}
                                    nameErrorMessage={errors?.truongHopBenh?.benhVienChuyenToi as string}
                                    touched={touched?.truongHopBenh?.benhVienChuyenToi}
                                    value={values.truongHopBenh?.benhVienChuyenToi}
                                    isDisabled={existTHB}
                                />
                            )}
                            {configByStatus?.tinhTrangKhac && (
                                <OCTTextValidator
                                    lable="Tình trạng khác"
                                    type="text"
                                    isRequired
                                    name="truongHopBenh.tinhTrangKhac"
                                    value={values.truongHopBenh?.tinhTrangKhac}
                                    onChange={handleChange}
                                    errors={errors?.truongHopBenh?.tinhTrangKhac}
                                    touched={touched?.truongHopBenh?.tinhTrangKhac}
                                    disabled={existTHB}
                                />
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default TinhTrangBox