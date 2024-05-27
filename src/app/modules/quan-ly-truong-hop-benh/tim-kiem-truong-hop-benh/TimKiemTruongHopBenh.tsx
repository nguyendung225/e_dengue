import FilterSearchContainer from "./components/FilterSearchContainer";
import { Button } from "react-bootstrap";
import "./styles/TimKiemTruongHopBenh.scss";
import { OCTKTSVG, OCTTable } from "@oceantech/oceantech-ui";
import { truongHopBenhColumns } from "./constants/constants";
type Props = {};

const TimKiemTruongHopBenh = (props: Props) => {
  return (
    <div className="search-container">
      <FilterSearchContainer />
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

        <OCTTable data={[]} columns={truongHopBenhColumns} noToolbar={true} />

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
