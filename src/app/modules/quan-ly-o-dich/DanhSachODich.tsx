import { OCTTable } from "@oceantech/oceantech-ui";
import { TYPE } from "../utils/Constant";
import { dsOBenhColumns } from "./constants/constants";
import FilterSearchBox from "./components/FilterSearch";
import "./styles/quanLyODich.scss";

const DanhSachODich = () => {
    return (
        <div className="spaces mt-15">
            <div className="section-container">
                <div className="spaces mb-15 fs-18 fw-bold text-uppercase color-dark-red">
                    Tìm kiếm ổ dịch
                </div>
                <FilterSearchBox />
            </div>
            <div className="section-container spaces mt-15">
                <div className="spaces fs-18 fw-bold text-uppercase color-dark-red">
                    Danh sách ổ dịch
                </div>
                <OCTTable
                    id="profile"
                    data={[]}
                    columns={dsOBenhColumns}
                    // searchObject={searchObject}
                    // setSearchObject={setSearchObject}
                    type={TYPE.SINGLE}
                    fixedColumnsCount={0}
                    notDelete={true}
                    notEdit={true}
                    noToolbar={true}
                    // totalPages={totalPage}
                    // totalElements={totalElements}
                    // numberOfElements={numberOfElements}
                    // dataChecked={dataChecked}
                    // setDataChecked={setDataChecked}
                    unSelectedAll={true}
                />
            </div>
        </div>
    )
}

export default DanhSachODich