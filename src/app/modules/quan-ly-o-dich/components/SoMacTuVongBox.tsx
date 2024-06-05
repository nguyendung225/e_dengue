import { OCTKTSVG } from "@oceantech/oceantech-ui";
import { useFormikContext } from "formik";
import { Button } from "react-bootstrap";
import TableCustom from "../../component/table/table-custom/TableCustom";
import { dsSoMacTuVongColumns, INITIAL_SO_CA_MAC } from "../constants/constants";
import { IThongTinODich } from "../models/quanLyODichModels";

const SoMacTuVongBox = () => {
    const { values, handleChange, setValues, errors, touched } = useFormikContext<IThongTinODich>()
    const handleAddRow = () => {
        setValues(prev => {
            return { ...prev, soCaMacList: [...prev.soCaMacList, INITIAL_SO_CA_MAC] }
        });
    };

    const handleDeleteRow = (index: number) => {
        setValues(prev => {
            return { ...prev, soCaMacList: prev.soCaMacList.filter((item, indexItem) => indexItem !== index) }
        })
    }

    const totals = values.soCaMacList?.reduce((acc, item) => {
        return {
            soMac: acc.soMac + (Number(item.soMac)),
            soChet: acc.soChet + (Number(item.soChet))
        };
    }, { soMac: 0, soChet: 0 });

    return (
        <div className="section-container">
            <div className="d-flex align-items-center justify-content-between">
                <div className="spaces mb-10 fs-18 fw-bold text-uppercase color-dark-red">
                    Số mắc, tử vong
                </div>
                <Button
                    className="button-primary"
                    onClick={handleAddRow}
                >
                    <OCTKTSVG path='/media/svg/icons/plus.svg' svgClassName='spaces h-14 w-14 color-white' />
                    Thêm mới
                </Button>
            </div>
            <div className="border-top spaces pt-10">
                <TableCustom
                    updatePageData={() => { }}
                    id="bien-phap-phong-chong"
                    data={values.soCaMacList}
                    columns={dsSoMacTuVongColumns({ handleDeleteRow, handleChange, values, errors, touched })}
                    notDelete={true}
                    noToolbar={true}
                    unSelectedAll={true}
                    noPagination={true}
                />
            </div>
            <div className="d-flex mt-2 justify-content-end w-100  gap-2">
                <div className="">Số mắc: <span className="fw-bold text-primary ps-2">{totals.soMac}</span></div>
                <div className="">Số chết:<span className="fw-bold text-danger ps-2">{totals.soChet}</span></div>
            </div>     
        </div>
    )
}

export default SoMacTuVongBox