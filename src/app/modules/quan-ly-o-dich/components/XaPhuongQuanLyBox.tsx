import { useFormikContext } from "formik"
import AsyncAutoComplete from "../../component/input-field/AsyncAutoComplete"
import { getListCoSoDieuTri } from "../../services"
import { IThongTinODich } from "../models/quanLyODichModels"

const XaPhuongQuanLyBox = () => {
    const { values, errors, setFieldValue, touched } = useFormikContext<IThongTinODich>()
    const existTHB = Boolean(values?.doiTuongMacBenh?.doiTuongMacBenhId)
    return (
        <div className="section-container">
            <div className="spaces mb-10 fs-18 fw-bold text-uppercase color-dark-red">
                Xã/phường quản lý
            </div>
            <div className="border-top spaces pt-10">
                <AsyncAutoComplete
                    params={{}}
                    required
                    displayField='tenCoSo'
                    label="Trạm y tế"
                    service={getListCoSoDieuTri}
                    handleChange={(value) => setFieldValue("truongHopBenh.coSoQuanLy", value)}
                    nameErrorMessage={errors?.truongHopBenh?.coSoQuanLy as string}
                    touched={touched?.truongHopBenh?.coSoQuanLy}
                    value={values.truongHopBenh?.coSoQuanLy}
                    isDisabled={existTHB}
                />
            </div>
        </div>
    )
}

export default XaPhuongQuanLyBox