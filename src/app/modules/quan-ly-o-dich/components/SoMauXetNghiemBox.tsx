import { OCTKTSVG, OCTTable } from "@oceantech/oceantech-ui";
import { useFormikContext } from "formik";
import { Button } from "react-bootstrap";
import { dsSoMauXetNghiemColumns, INITIAL_XET_NGHIEM } from "../constants/constants";
import { IThongTinODich } from "../models/quanLyODichModels";

const SoMauXetNghiemBox = () => {

    const { values, handleChange, setValues, errors, touched, } = useFormikContext<IThongTinODich>()

    const handleAddRow = () => {
        setValues(prev => {
            return {
                ...prev,
                xetNghiemList: [
                    ...prev.xetNghiemList,
                    { ...INITIAL_XET_NGHIEM }
                ]
            }
        });
    };

    const handleDeleteRow = (index: number) => {
        setValues(prev => {
            return { ...prev, xetNghiemList: prev.xetNghiemList.filter((item, indexItem) => indexItem !== index) }
        })
    }

    const totals = values.xetNghiemList?.reduce((acc, item) => {
        return {
            soXn: acc.soXn + (Number(item.soXn)),
            soDuongTinh: acc.soDuongTinh + (Number(item.soDuongTinh))
        };
    }, { soXn: 0, soDuongTinh: 0 });

    return (
        <div className="section-container">
            <div className="d-flex align-items-center justify-content-between">
                <div className="spaces mb-10 fs-18 fw-bold text-uppercase color-dark-red">
                    Số mẫu xét nghiệm
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
                <OCTTable
                    id="bien-phap-phong-chong"
                    data={values?.xetNghiemList}
                    columns={
                        dsSoMauXetNghiemColumns({
                            handleDeleteRow,
                            handleChange,
                            values,
                            errors,
                            touched
                        })}
                    notDelete={true}
                    notEdit={true}
                    noToolbar={true}
                    unSelectedAll={true}
                    noPagination={true}
                />
                <div className="d-flex mt-2 justify-content-end w-100  gap-2">
                    <div className="">Số mẫu XN: <span className="fw-bold text-primary ps-2">{totals.soXn}</span></div>
                    <div className="">Số mẫu (+):<span className="fw-bold text-danger ps-2">{totals.soDuongTinh}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SoMauXetNghiemBox