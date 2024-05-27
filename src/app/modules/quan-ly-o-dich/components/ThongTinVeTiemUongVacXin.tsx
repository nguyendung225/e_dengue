import { OCTTextValidator } from "@oceantech/oceantech-ui";
import LabelRequired from "../../component/LabelRequired";
import RadioGroup from "../../component/input-field/RadioGroup";

const TIEM_OPTION = [
    { name: "Có tiêm, uống", code: 1 },
    { name: "Không", code: 2 },
    { name: "Không rõ", code: 3 },
]

const ThongTinVeTiemUongVacXin = () => {


    return (
        <div className="section-container">
            <div className="spaces mb-10 fs-18 fw-bold text-uppercase color-dark-red">
                Thông tin về tiêm, uống vắc xin
            </div>
            <div className="border-top spaces mb-10 pt-15">
                <RadioGroup
                    name={""}
                    value={1}
                    groupContainerClassName="d-flex flex-column"
                    radioItemList={TIEM_OPTION}
                    handleChange={() => { }}
                />
            </div>
            <div className="d-flex">
                <LabelRequired
                    isRequired
                    label="Số lần tiêm, uống"
                    className="spaces fw-500 mb-5 min-w-140"
                />
                <OCTTextValidator
                    className="w-100"
                    name="soLanTiemUong"
                    type="text"

                />
            </div>
        </div>
    )
}

export default ThongTinVeTiemUongVacXin