import { OCTKTSVG } from "@oceantech/oceantech-ui"
import { useFormikContext } from "formik"
import { Button } from "react-bootstrap"
import TableCustom from "../../component/table/table-custom/TableCustom"
import { dsBienPhapPhongChongColumns, INITIAL_BIEN_PHAP_TRIEN_KHAI } from "../constants/constants"
import { IThongTinODich } from "../models/quanLyODichModels"

const BienPhapPhongChongBox = () => {
    const { values, handleChange, setValues, setFieldValue } = useFormikContext<IThongTinODich>()

    const handleAddRow = () => {
        setValues(prev => {
            return { ...prev, bienPhapTrienKhaiList: [...prev.bienPhapTrienKhaiList, INITIAL_BIEN_PHAP_TRIEN_KHAI] }
        });
    };

    const handleDeleteRow = (index: number) => {
        setValues(prev => {
            return { ...prev, bienPhapTrienKhaiList: prev.bienPhapTrienKhaiList.filter((item, indexItem) => indexItem !== index) }
        })
    }

    return (
        <div className="section-container">
            <div className="d-flex align-items-center justify-content-between">
                <div className="spaces mb-10 fs-18 fw-bold text-uppercase color-dark-red">
                    Biện pháp phòng chống dịch đã triển khai
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
                    data={values?.bienPhapTrienKhaiList}
                    columns={dsBienPhapPhongChongColumns({
                        handleDeleteRow,
                        handleChange,
                        values,
                        setFieldValue
                    })}
                    notDelete={true}
                    notEdit={true}
                    noToolbar={true}
                    unSelectedAll={true}
                    noPagination={true}
                />
            </div>
        </div>
    )
}

export default BienPhapPhongChongBox