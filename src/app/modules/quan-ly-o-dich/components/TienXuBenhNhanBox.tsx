import { OCTTable } from "@oceantech/oceantech-ui"
import { dsTienXuBenhNhanColumns } from "../constants/constants"

const TienXuBenhNhanBox = () => {
    return (
        <div className="section-container">
            <div className="spaces mb-10 fs-18 fw-bold text-uppercase color-dark-red">
                Tiền xử bênh nhân
            </div>
            <div className="border-top">
                <OCTTable 
                    id="tien-xu-benh-nhan"
                    data={[]}
                    columns={dsTienXuBenhNhanColumns}
                    // searchObject={searchObject}
                    // setSearchObject={setSearchObject}
                    // type={TYPE.SINGLE}
                    // fixedColumnsCount={0}
                    notDelete={true}
                    notEdit={true}
                    noToolbar={true}
                    // totalPages={totalPage}
                    // totalElements={totalElements}
                    // numberOfElements={numberOfElements}
                    // dataChecked={dataChecked}
                    // setDataChecked={setDataChecked}
                    unSelectedAll={true}
                    noPagination={true}
                />
            </div>
        </div>
    )
}

export default TienXuBenhNhanBox