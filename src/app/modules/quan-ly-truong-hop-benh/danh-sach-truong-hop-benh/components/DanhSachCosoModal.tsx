
import { Modal } from 'react-bootstrap';
import TableCustom from './../../../component/table/table-custom/TableCustom';
import { TYPE } from '../../../utils/Constant';
import { columnsDSCoSo } from '../constants/constant';

type Props = {
    handleClose: () => void
    title?: string
    keyword?: string
}
export default function DanhSachCoSoModal({ handleClose, title = "Danh sách cơ sở" }: Props) {

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
                    <TableCustom
                        updatePageData={() => { }}
                        data={[]}
                        columns={columnsDSCoSo}
                        type={TYPE.SINGLE}
                        justFilter={false}
                        noToolbar
                    />
                </Modal.Body>
            </Modal>

        </>
    )
}