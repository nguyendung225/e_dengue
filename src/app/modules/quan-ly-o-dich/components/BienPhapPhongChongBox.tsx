import { OCTKTSVG, OCTTable } from "@oceantech/oceantech-ui"
import { dsBienPhapPhongChongColumns } from "../constants/constants"
import { Button } from "react-bootstrap"
import { useState } from "react"

const BienPhapPhongChongBox = () => {
    const [bienPhapPhongChongList, setBienPhapPhongChongList] = useState<any>([]);

    const handleAddRow = () => {
        setBienPhapPhongChongList([...bienPhapPhongChongList, {}]);
    }

    const handleDeleteRow = (deleteItem: any, indexItem: number) => {
        setBienPhapPhongChongList((bienPhapPhongChongListPrev: any) => {
            return bienPhapPhongChongListPrev.filter((bienPhap: any, index: number) => {
                return indexItem !== index;
            })
        })
    }

    const handleChange = (name: string, value: number | string, rowIndex: number) => {
        setBienPhapPhongChongList((bienPhapPhongChongListPrev: any) => {
            return bienPhapPhongChongListPrev.map((bienPhap: any, index: number) => {
                return index === rowIndex
                    ? {
                        ...bienPhap,
                        [name]: value,
                    } : bienPhap;
            })
        });
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
                <OCTTable
                    id="bien-phap-phong-chong"
                    data={bienPhapPhongChongList}
                    columns={dsBienPhapPhongChongColumns({
                        handleChange,
                        handleDeleteRow
                    })}
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

export default BienPhapPhongChongBox