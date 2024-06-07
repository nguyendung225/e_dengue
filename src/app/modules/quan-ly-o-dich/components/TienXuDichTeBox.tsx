import { OCTTextValidator } from "@oceantech/oceantech-ui"
import { useFormikContext } from "formik"
import { IThongTinODich } from "../models/quanLyODichModels"

const TienXuDichTeBox = () => {
    const { values, handleChange } = useFormikContext<IThongTinODich>()
    const existTHB = Boolean(values?.doiTuongMacBenh?.doiTuongMacBenhId)
    return (
        <div className="section-container">
            <div className="spaces mb-10 fs-18 fw-bold text-uppercase color-dark-red">
                Tiền xử dịch tễ
            </div>
            <div className="border-top spaces pt-10">
                <OCTTextValidator
                    lable="Tiền sử dịch tễ"
                    type="text"
                    as="textarea"
                    rows={2}
                    value={values?.truongHopBenh?.tienSuDichTe}
                    name={"truongHopBenh.tienSuDichTe"}
                    onChange={handleChange}
                    disabled={existTHB}
                />
            </div>
        </div>
    )
}

export default TienXuDichTeBox