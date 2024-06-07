import { OCTTextValidator } from "@oceantech/oceantech-ui";
import { useFormikContext } from "formik";
import RadioGroup from "../../component/input-field/RadioGroup";
import { CO_SU_DUNG_VAXIN, SU_DUNG_VAXIN } from "../../quan-ly-truong-hop-benh/danh-sach-truong-hop-benh/constants/constant";
import { IThongTinODich } from "../models/quanLyODichModels";

const ThongTinVeTiemUongVacXin = () => {
    const { values, handleChange, errors, touched, } = useFormikContext<IThongTinODich>()
    const existTHB = Boolean(values?.doiTuongMacBenh?.doiTuongMacBenhId)

    return (
        <div className="section-container">
            <div className="spaces mb-10 fs-18 fw-bold text-uppercase color-dark-red">
                Thông tin về tiêm, uống vắc xin
            </div>
            <div className="border-top spaces mb-10 pt-15">
                <RadioGroup
                    name={"truongHopBenh.suDungVacXin"}
                    value={values?.truongHopBenh?.suDungVacXin}
                    groupContainerClassName="d-flex flex-column"
                    radioItemList={SU_DUNG_VAXIN}
                    handleChange={handleChange}
                    disabled={existTHB}
                />
            </div>
            <div >
                {values?.truongHopBenh?.suDungVacXin === CO_SU_DUNG_VAXIN && (
                    <OCTTextValidator
                        lable="Số lần tiêm, uống"
                        type="text"
                        name="truongHopBenh.soLanSuDung"
                        value={values?.truongHopBenh?.soLanSuDung}
                        onChange={handleChange}
                        isRequired
                        errors={errors?.truongHopBenh?.soLanSuDung}
                        touched={touched?.truongHopBenh?.soLanSuDung}
                        disabled={existTHB}
                    />
                )}
            </div >
        </div>
    )
}

export default ThongTinVeTiemUongVacXin