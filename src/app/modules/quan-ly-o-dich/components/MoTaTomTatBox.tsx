import { useFormikContext } from "formik"
import { IThongTinODich } from "../models/quanLyODichModels"
import { OCTTextValidator } from "@oceantech/oceantech-ui"

const MoTaTomTatBox = () => {
    
    const { values, handleChange } = useFormikContext<IThongTinODich>()

    return (
        <div className="section-container">
            <div className="spaces mb-10 fs-18 fw-bold text-uppercase color-dark-red">
                Mô tả tóm tắt các chùm ca bệnh được phát hiện
            </div>
            <div className="border-top spaces pt-10">
                <OCTTextValidator
                    type="text"
                    value={values?.oDich?.moTaTomTat}
                    name={"oDich.moTaTomTat"}
                    onChange={handleChange}
                    as="textarea"
                    rows={2}
                />
            </div>
        </div>
    )
}

export default MoTaTomTatBox