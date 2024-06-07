
import { OCTTable } from '@oceantech/oceantech-ui';
import { Modal } from 'react-bootstrap';
import { TYPE } from '../../../utils/Constant';
import { columnNamesType } from '../../../component/table/table-custom/TableCustom';

type Props = {
    handleClose: () => void
    title?: string
    columns: columnNamesType[]
    data: any
    configTable: configTable
    setSearchObject: React.Dispatch<any>
    setDataSelected: (row: any) => void
}

type tablePagination = {
    pageIndex: number,
    pageSize: number
}

type configTable = {
    totalPages: number,
    totalElements: number,
    numberOfElements: number
}

export default function DanhSachCoSoModal({ handleClose, title, columns, data, configTable, setSearchObject, setDataSelected }: Props) {

    const handleChangePagination = (table: tablePagination) => {
        setSearchObject((prev: any) => {
            return {
                ...prev,
                PageNumber: table?.pageIndex,
                PageSize: table?.pageSize || 10,
            }
        })
    }

    const handleSelectRow = (row: any) => {
        setDataSelected(row)
        handleClose()
    }

    return (
        <>
            <Modal
                onHide={handleClose}
                show
                centered
                animation
                className='bg-backdrop-dark'
                size='lg'
            >
                <Modal.Header closeButton>
                    <h3>{title}</h3>
                </Modal.Header>
                <Modal.Body>
                    <OCTTable
                        data={data}
                        columns={columns}
                        justFilter={false}
                        noToolbar
                        setSearchObject={handleChangePagination}
                        type={TYPE.SINGLE}
                        totalPages={configTable?.totalPages}
                        totalElements={configTable?.totalElements}
                        numberOfElements={configTable?.numberOfElements}
                        setDataChecked={handleSelectRow}
                    />
                </Modal.Body>
            </Modal>

        </>
    )
}