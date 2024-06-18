import { OCTTable } from "@oceantech/oceantech-ui";
import { RESPONSE_STATUS_CODE, TYPE } from "../utils/Constant";
import { INITIAL_CONFIG_TABLE, SEARCH_OBJECT_INIT, dsOBenhColumns } from "./constants/constants";
import FilterSearchBox from "./components/FilterSearch";
import "./styles/quanLyODich.scss";
import { useContext, useEffect, useState } from "react";
import { ISearchObjModel, IConfigTable } from "./models/quanLyODichModels";
import AppContext from "../../AppContext";
import { searchODichByPage } from "./sevices/quanLyODichServices";
import { toast } from "react-toastify";
import FilterSearchContainer from "./components/FilterSearchContainer";
import { convertListSearchObject } from "../utils/FunctionUtils";
import { localStorageItem } from "../utils/LocalStorage";
import { KEY_LOCALSTORAGE } from "../auth/core/_consts";

const DanhSachODich = () => {
    const [oDichList, setODichList] = useState<any>([]);
    const [searchObject, setSearchObj] = useState<ISearchObjModel>(SEARCH_OBJECT_INIT);
    const { setPageLoading } = useContext(AppContext);
    const [configTable, setConfigTable] = useState<IConfigTable>(INITIAL_CONFIG_TABLE);
    const userData = localStorageItem.get(KEY_LOCALSTORAGE.USER_INFOMATION)
    
    const updatePageData = async (searchData: ISearchObjModel) => {
      try {
        setPageLoading(true);
        const { data } = await searchODichByPage(searchData);

        if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
          setConfigTable({
            totalElement: data?.data?.total,
            totalPages: data?.data?.totalPages,
            numberOfElements: data?.data?.numberOfElements,
          });
          setODichList(data?.data?.data || []);
          return;
        }
        toast.warning(data?.message);
      } catch (error) {
        toast.error(error as string);
      } finally {
        setPageLoading(false);
      }
    };

    useEffect(() => {
      setSearchObj((prev) => ({
        ...prev,
        tinhId: userData?.tinhInfo,
        huyenId: userData?.huyenInfo,
        xaId: userData?.xaInfo,
      }));
    }, []);

    useEffect(() => {
      let {
        listBenhTruyenNhiemId,
        tinh,
        huyen,
        xa,
        donViBaoCao,
        ...newSearchObject
      } = searchObject;
      const benhTruyenNhiem = convertListSearchObject(
        listBenhTruyenNhiemId as any[],
        "listBenhTruyenNhiemId"
      );

      const searchObjTemp = {
        ...newSearchObject,
        ...benhTruyenNhiem,
        tinhId: tinh?.id,
        huyenId: huyen?.id,
        xaId: xa?.xaId,
        donViBaoCaoId: donViBaoCao?.id,
      };
      updatePageData(searchObjTemp);
    }, [searchObject]);
       
    return (
        <div className="spaces mt-15 search-container">
            <div className="section-container">
                <div className="spaces mb-15 fs-18 fw-bold text-uppercase color-dark-red">
                    Tìm kiếm ổ dịch
                </div>
                <FilterSearchContainer setSearchObj={setSearchObj}>
                    <FilterSearchBox />
                </FilterSearchContainer>
            </div>
            <div className="section-container spaces mt-15">
                <div className="spaces fs-18 fw-bold text-uppercase color-dark-red">
                    Danh sách ổ dịch
                </div>
                <OCTTable
                    id="profile"
                    data={oDichList}
                    columns={dsOBenhColumns}
                    searchObject={searchObject}
                    setSearchObject={setSearchObj}
                    fixedColumnsCount={0}
                    notDelete={true}
                    notEdit={true}
                    noToolbar={true}
                    totalPages={configTable.totalPages}
                    totalElements={configTable.totalElement}
                    numberOfElements={configTable.numberOfElements}
                />
            </div>
        </div>
    )
}

export default DanhSachODich