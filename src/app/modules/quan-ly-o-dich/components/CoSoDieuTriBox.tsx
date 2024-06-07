import { OCTAutocomplete } from "@oceantech/oceantech-ui"
import { useFormikContext } from "formik"
import { Col, Row } from "react-bootstrap"
import AsyncAutoComplete from "../../component/input-field/AsyncAutoComplete"
import { DIA_DIEM_DIEU_TRI } from "../../quan-ly-truong-hop-benh/danh-sach-truong-hop-benh/constants/constant"
import { getListCoSoDieuTri } from "../../services"
import { IThongTinODich } from "../models/quanLyODichModels"

const CoSoDieuTriBox = () => {
    const { values, errors, touched, setFieldValue, } = useFormikContext<IThongTinODich>()
    const existTHB = Boolean(values?.doiTuongMacBenh?.doiTuongMacBenhId)

    return (
        <div className="section-container">
            <div className="spaces mb-10 fs-18 fw-bold text-uppercase color-dark-red">
                Cơ sở điều trị
            </div>
            <div className="border-top">
                <Row>
                    <Col Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                        <OCTAutocomplete
                            lable="Địa điểm"
                            options={DIA_DIEM_DIEU_TRI}
                            isRequired
                            valueSearch="code"
                            name="truongHopBenh.noiPhatHien"
                            value={values.truongHopBenh?.noiPhatHien}
                            onChange={(option) => setFieldValue("truongHopBenh.noiPhatHien", option?.code)}
                            errors={errors?.truongHopBenh?.noiPhatHien}
                            touched={touched?.truongHopBenh?.noiPhatHien}
                            isDisabled={existTHB}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                        <AsyncAutoComplete
                            params={{}}
                            required
                            label="Cơ sở điều trị"
                            displayField='tenCoSo'
                            service={getListCoSoDieuTri}
                            handleChange={(value) => setFieldValue("truongHopBenh.coSoDieuTri", value)}
                            nameErrorMessage={errors?.truongHopBenh?.coSoDieuTri as string}
                            touched={touched?.truongHopBenh?.coSoDieuTri}
                            value={values.truongHopBenh?.coSoDieuTri}
                            isDisabled={existTHB}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default CoSoDieuTriBox