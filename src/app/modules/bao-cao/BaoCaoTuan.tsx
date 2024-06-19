import { Button} from "react-bootstrap"
import TableGrouping from "../component/table/table-grouping/TableGrouping"
import {  SEARCH_OBJECT_INIT, columnBaoCaoTuan, columnTotalBaoCao, initBaoCao } from "./constant/constants"
import { useContext, useEffect, useState } from "react"
import AppContext from "../../AppContext"
import { getDataBaoCao } from "./services/services"
import { IBaoCao, ISearchBaoCao } from "./model/model"
import { RESPONSE_STATUS_CODE } from "../utils/Constant"
import { toast } from "react-toastify"
import FilterSearchContainer from "./components/FilterSearchContainer"
import SearchAdvanceForm from "./components/SearchAdvanceForm"
import { localStorageItem } from "../utils/LocalStorage"
import { KEY_LOCALSTORAGE } from "../auth/core/_consts"
import ModalPhieuIn from "../component/ModalPhieuIn"
import PhieuInBaoCao from "./components/PhieuInBaoCao"

const BaoCaoTuan = () => {
    const [baoCaoTuanList, setBaoCaoTuanList] = useState<any>([]);
    const [searchObject, setSearchObj] = useState<ISearchBaoCao>(SEARCH_OBJECT_INIT);
    const { setPageLoading } = useContext(AppContext);
    const userData = localStorageItem.get(KEY_LOCALSTORAGE.USER_INFOMATION)
    const [openModalPhieuIn,setOpenModalPhieuIn] = useState<boolean>(false)
    const [thongTinBaoCao,setThongTinBaoCao] = useState<IBaoCao>(initBaoCao)

    useEffect(() => {
      setSearchObj({
        ...searchObject,
        tinhIds: userData?.tinhInfo && [userData?.tinhInfo?.id],
        huyenIds: userData?.huyenInfo && [userData?.huyenInfo?.id],
        xaIds: userData?.xaInfo && [userData?.xaInfo?.xaId],
      });
    }, []);

    const updatePageData = async (searchData: ISearchBaoCao) => {
        try {
          setPageLoading(true);
          const { data } = await getDataBaoCao(searchData);
          if (data?.code === RESPONSE_STATUS_CODE.SUCCESS) {
            setBaoCaoTuanList(data?.data?.listBaoCaoDiaPhuong || []);
            setThongTinBaoCao(data?.data)
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
      updatePageData(searchObject);
    }, [searchObject]);

    return (
        <>
          <div className="position-relative spaces z-index-4">
            <FilterSearchContainer
              setSearchObject={setSearchObj}
              searchObject={searchObject}
            >
              <SearchAdvanceForm />
            </FilterSearchContainer>
          </div>
          <div className="section-container spaces mt-15">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="spaces mb-15 fs-18 fw-bold text-uppercase color-dark-red">
                        DANH SÁCH BÁO CÁO TUẦN
                    </div>
                    <Button
                        className="button-primary"
                        onClick={() => setOpenModalPhieuIn(true)}
                    >
                        In Báo cáo
                    </Button>
                </div>
                <div className="bg-white spaces mt-10 flex-1">
                    <TableGrouping
                        id="reportDetail"
                        columns={columnBaoCaoTuan}
                        data={baoCaoTuanList}
                        className="table-custom"
                        columnsTotal={columnTotalBaoCao}
                        showTotalRow
                    />
                </div>
          </div>
          <ModalPhieuIn
              show={openModalPhieuIn}
              handleCloseDialog={() => setOpenModalPhieuIn(false)}
              size="lg"
          >
              <PhieuInBaoCao thongTinBaoCao={thongTinBaoCao} />
          </ModalPhieuIn>
        </>
    )
}

export default BaoCaoTuan