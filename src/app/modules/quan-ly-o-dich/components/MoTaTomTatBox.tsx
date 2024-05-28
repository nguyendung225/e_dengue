import { OCTTextArea } from "@oceantech/oceantech-ui"

const MoTaTomTatBox = () => {
    return (
        <div className="section-container">
            <div className="spaces mb-10 fs-18 fw-bold text-uppercase color-dark-red">
                Mô tả tóm tắt các chùm ca bệnh được phát hiện
            </div>
            <div className="border-top spaces pt-10">
                <OCTTextArea
                    row={3}
                    as="textarea"
                    name="moTa"
                    placeholder="Nhập mô tả"
                    onChange={() => { }}
                />
            </div>
        </div>
    )
}

export default MoTaTomTatBox