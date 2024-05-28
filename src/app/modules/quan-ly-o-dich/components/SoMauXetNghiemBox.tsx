import { OCTKTSVG, OCTTable } from "@oceantech/oceantech-ui"
import { Button } from "react-bootstrap"
import { dsSoMauXetNghiemColumns } from "../constants/constants"

const SoMauXetNghiemBox = () => {
    return (
        <div className="section-container">
            <div className="d-flex align-items-center justify-content-between">
                <div className="spaces mb-10 fs-18 fw-bold text-uppercase color-dark-red">
                    Số mắc, tử vong
                </div>
                <Button
                    className="button-primary"
                    onClick={() => { }}
                >
                    <OCTKTSVG path='/media/svg/icons/plus.svg' svgClassName='spaces h-14 w-14 color-white' />
                    Thêm mới
                </Button>
            </div>
            <div className="border-top spaces pt-10">
                <OCTTable
                    id="bien-phap-phong-chong"
                    data={[]}
                    columns={dsSoMauXetNghiemColumns}
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

export default SoMauXetNghiemBox