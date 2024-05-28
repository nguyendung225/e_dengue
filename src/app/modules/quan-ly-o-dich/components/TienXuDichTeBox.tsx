import { OCTTextArea } from "@oceantech/oceantech-ui"

const TienXuDichTeBox = () => {
    return (
        <div className="section-container">
            <div className="spaces mb-10 fs-18 fw-bold text-uppercase color-dark-red">
                Tiền xử dịch tễ
            </div>
            <div className="border-top spaces pt-10">
                <OCTTextArea
                    row={3}
                    as="textarea"
                    name="tienXuDichTe"
                    placeholder="Tiền xử dịch tễ"
                    onChange={() => { }}
                />
            </div>
        </div>
    )
}

export default TienXuDichTeBox