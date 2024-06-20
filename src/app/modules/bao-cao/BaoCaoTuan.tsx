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
import { getListHuyenByTinhId, getListTinh, getListXaByHuyenId } from "../services"

const BaoCaoTuan = () => {
    const [baoCaoTuanList, setBaoCaoTuanList] = useState<any>([]);
    const [searchObject, setSearchObj] = useState<ISearchBaoCao>(SEARCH_OBJECT_INIT);
    const { setPageLoading } = useContext(AppContext);
    const userData = localStorageItem.get(KEY_LOCALSTORAGE.USER_INFOMATION)
    const [openModalPhieuIn,setOpenModalPhieuIn] = useState<boolean>(false)
    const [thongTinBaoCao,setThongTinBaoCao] = useState<IBaoCao>(initBaoCao)

  useEffect(() => {
    checkAndSetSearchObject();
  }, []);

  const setSearchObject = () => {
    setSearchObj({
      ...searchObject,
      tinhIds: [userData?.tinhInfo?.id],
      huyenIds: [userData?.huyenInfo?.id],
      xaIds: [userData?.xaInfo?.xaId],
    });
  };

  const checkAndSetSearchObject = () => {
    if (userData?.tinhInfo && userData?.huyenInfo && userData?.xaInfo) {
      setSearchObject();
      return;
    }
    
    if (userData?.tinhInfo && userData?.huyenInfo) {
      getAllXa(userData.huyenInfo.id);
      return;
    }
    
    if (userData?.tinhInfo) {
      getAllHuyen(userData.tinhInfo.id);
      return;
    }

    getAllTinh();
  };

  const getAllXa = async (id: number) => {
    try {
      const { data } = await getListXaByHuyenId(id);
      setSearchObj((prevValues) => ({
        ...prevValues,
        tinhIds: userData?.tinhInfo ? [userData.tinhInfo.id] : null,
        huyenIds: userData?.huyenInfo ? [userData.huyenInfo.id] : null,
        xaIds: data?.data.map((item: any) => {
          return item.maXa
        }) || [],
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const getAllHuyen = async (id: number) => {
    try {
      const { data } = await getListHuyenByTinhId(id);
      setSearchObj((prevValues) => ({
        ...prevValues,
        tinhIds: userData?.tinhInfo ? [userData.tinhInfo.id] : null,
        huyenIds: data?.data.map((item: any) => {
          return item.maHuyen
        }) || [],
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const getAllTinh = async () => {
    try {
      const { data } = await getListTinh()
      setSearchObj((prevValues) => ({
        ...prevValues,
        tinhIds: data?.data.map((item: any) => {
          return item.maTinh
        }) || [],
      }));
    } catch (error) {
      console.error(error)
    }
  }

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
      if (searchObject?.tinhIds || searchObject?.huyenIds || searchObject?.xaIds) {
        updatePageData(searchObject);
      }
    }, [searchObject]);

    return (
      <div className="spaces mt-15 search-container">
        <div className="position-relative spaces z-index-4">
          <FilterSearchContainer
            setSearchObject={setSearchObj}
            searchObject={searchObject}
          >
            <SearchAdvanceForm />
          </FilterSearchContainer>
        </div>
        <div className="section-container spaces mt-15">
          <div className="d-flex align-items-center justify-content-between my-4">
            <div className="spaces fs-18 fw-bold text-uppercase color-dark-red">
              DANH SÁCH BÁO CÁO TUẦN
            </div>
            <Button
              className="button-primary"
              onClick={() => setOpenModalPhieuIn(true)}
            >
              In Báo cáo
            </Button>
          </div>
          <TableGrouping
            id="reportDetail"
            columns={columnBaoCaoTuan}
            data={baoCaoTuanList}
            className="table-custom"
            columnsTotal={columnTotalBaoCao}
            showTotalRow
          />
        </div>

        <ModalPhieuIn
          show={openModalPhieuIn}
          handleCloseDialog={() => setOpenModalPhieuIn(false)}
          size="lg"
        >
          <PhieuInBaoCao
            thongTinBaoCao={thongTinBaoCao}
            ngayBaoCao={searchObject}
          />
        </ModalPhieuIn>
      </div>
    )
}

export default BaoCaoTuan