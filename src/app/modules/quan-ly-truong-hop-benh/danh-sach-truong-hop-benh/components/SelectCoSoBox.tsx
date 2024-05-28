import React, { useState } from 'react'
import { OCTTextValidator } from '@oceantech/oceantech-ui';
import DanhSachCoSodal from './DanhSachCosoModal';

type Props = {
    value: number | null
    lable: string
}

const SelectCoSoBox = (props: Props) => {
    const { value, lable } = props
    const [openDSCoSo, setOpenDSCoSo] = useState(false)
    return (
        <>
            <OCTTextValidator
                lable={lable}
                placeholder="Nhập tên hoặc mã đơn vị và [Enter] để tìm kiếm"
                value={value}
                onKeyDown={(event: any) => {
                    if (event?.key === "Enter") {
                        event.preventDefault()
                        setOpenDSCoSo(true)
                    }
                }}
            />
            {
                openDSCoSo &&
                <DanhSachCoSodal
                    handleClose={() => setOpenDSCoSo(false)}
                    title="Danh sách cơ sở"
                />
            }
        </>
    )
}
export default SelectCoSoBox