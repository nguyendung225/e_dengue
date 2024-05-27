import { OCTTextValidator } from "@oceantech/oceantech-ui"
import LabelRequired from "../../component/LabelRequired"

const XaPhuongQuanLyBox = () => {
    return (
        <div className="section-container">
            <div className="spaces mb-10 fs-18 fw-bold text-uppercase color-dark-red">
                Xã/phường quản lý
            </div>
            <div className="border-top spaces pt-10">
                <LabelRequired
                    isRequired
                    label="Trạm y tế"
                    className="spaces fw-500 mb-5"
                />
                <OCTTextValidator
                    name="tramYTe"
                    type="text"
                    placeholder="Nhập tên hoặc mã cơ sở"
                />
            </div>
        </div>
    )
}

export default XaPhuongQuanLyBox