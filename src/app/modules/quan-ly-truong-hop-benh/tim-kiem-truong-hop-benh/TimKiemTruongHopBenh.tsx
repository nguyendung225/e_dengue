import FilterSearchContainer from "./components/FilterSearchContainer";
import { Button } from "react-bootstrap";
import "./styles/TimKiemTruongHopBenh.scss";
import { OCTKTSVG, OCTTable } from "@oceantech/oceantech-ui";
import { SEARCH_OBJECT_INIT, truongHopBenhColumns } from "./constants/constants";
import { searchThbByPage } from "./services/TimKiemThbServices";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../../AppContext";
import { SearchObjectModel } from "../models/TimKiemTruongHopBenhModels";
import { toast } from "react-toastify";
import SearchAdvanceForm from "./components/SearchAdvanceForm";
type Props = {};

const TimKiemTruongHopBenh = (props: Props) => {
  const { setPageLoading } = useContext(AppContext);
  const [listDataTHB, setlistDataTHB] = useState<SearchObjectModel[]>([]);
  const [configTable, setConfigTable] = useState<any>({});
  const [searchObj, setSearchObj] = useState<SearchObjectModel>(SEARCH_OBJECT_INIT);

  const updatePageData = async (searchData: SearchObjectModel) => {
    try {
      setPageLoading(true);
      const { data } = await searchThbByPage(searchData);
      setConfigTable({
        totalElement: data.data.total,
        totalPages: data.data.totalPages,
        numberOfElements: data.data.numberOfElements,
      });
      setlistDataTHB(data?.data?.data || []);
    } catch (error) {
      console.error(error);
      toast.error(error as string);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    let tinhTrangHienNay: { [key: string]: number } = {};
    
    searchObj.listTinhTrangHienNay?.forEach((value: any, index: number) => {
      tinhTrangHienNay[`listTinhTrangHienNay[${index}]`] = value.code;
    });
    delete searchObj.listTinhTrangHienNay;

    const searchObjTemp: SearchObjectModel = {
      ...searchObj,
      ...tinhTrangHienNay,
      gioiTinh: searchObj.gioiTinh?.code,
      ngheNghiepId: searchObj.ngheNghiepId?.id,
      phanLoaiQuanLy: searchObj?.phanLoaiQuanLy?.code,
      tinhId: searchObj.tinhId?.id,
      huyenId: searchObj.huyenId?.id,
      xaId: searchObj.xaId?.xaId,
      coSoGhiNhanId: searchObj.coSoGhiNhanId?.id,
      kqXetNghiem: searchObj.kqXetNghiem?.code,
      donViThucHienXn: searchObj.donViThucHienXn?.id,
      coSoDieuTriId: searchObj.coSoDieuTriId?.id
    }
    updatePageData(searchObjTemp);
  }, [searchObj]);

  return (
    <div className="search-container">
      <div className="section-container z-index-3 position-relative">
        <FilterSearchContainer
          searchObject={searchObj}
          setSearchObject={setSearchObj}
        >
          <SearchAdvanceForm />
        </FilterSearchContainer>
      </div>
      <div className="spaces mt-15 section-container">
        <div className="d-flex justify-content-between border-bottom align-items-center spaces pt-8 pb-14">
          <div className="spaces fw-700 fs-16 color-dark-red text-uppercase">
            Danh sách trường hợp bệnh
          </div>
          <div className="d-flex align-items-center gap-4 spaces">
            <Button className="button-primary spaces bg-green mr-2 d-flex align-items-center">
              <OCTKTSVG
                path="/media/svg/icons/file-earmark-excel.svg"
                svgClassName="spaces h-14 w-14 color-white"
              />
              Xuất Excel
            </Button>
            <Button className="button-primary spaces bg-green d-flex align-items-center">
              <OCTKTSVG
                path="/media/svg/icons/file-earmark-pdf.svg"
                svgClassName="spaces h-14 w-14 color-white"
              />
              Xuất Pdf
            </Button>
          </div>
        </div>

        <OCTTable
          data={listDataTHB}
          columns={truongHopBenhColumns}
          noToolbar={true}
          totalElements={configTable?.totalElement}
          totalPages={configTable?.totalPages}
          numberOfElements={configTable.numberOfElements}
          searchObject={searchObj}
          setSearchObject={setSearchObj}
        />

        <div className="bg-white border-top spaces mt-10 py-14 px-10">
          <div className="fw-600">Chú thích:</div>
          <div className="d-flex align-items-center">
            <OCTKTSVG
              path="/media/svg/icons/check-circle-fill.svg"
              svgClassName="spaces h-14 w-14 mr-4 color-green"
            />
            <span className="spaces mt-4">
              Thời gian báo cáo trường hợp bệnh đúng theo quy định (trước 24h hoặc48h).
            </span>
          </div>
          <div className="d-flex align-items-center">
            <OCTKTSVG
              path="/media/svg/icons/exclamation-circle-fill.svg"
              svgClassName="spaces h-14 w-14 mr-4 color-red"
            />
            <span className="spaces mt-4">
              Thời gian báo cáo trường hợp bệnh quá thời gian quy định.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimKiemTruongHopBenh;
