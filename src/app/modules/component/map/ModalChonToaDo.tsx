import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useFormikContext } from 'formik';
import CustomMap from './CustomMap';
import { BenhReport } from '../../quan-ly-truong-hop-benh/danh-sach-truong-hop-benh/constants/constant';

type Props = {
    handleClose: () => void
}

function ModalChonToaDo({ handleClose }: Props) {
    const [position, setPosition] = useState<any>(null);
    const { setValues, values } = useFormikContext<BenhReport>()

    const handleXacNhan = () => {
        if (position) {
            handleClose()
            setValues({
                ...values,
                kinhDo: position[1],
                viDo: position[0],
            })
        }
        else {
            toast.warning('Vui lý chọn tọa độ trường hợp bệnh')
        }
    }

    return (
        <Modal
            show
            onHide={handleClose}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <h3>Chọn tọa độ trường hợp bệnh</h3>
            </Modal.Header>
            <Modal.Body>
                <CustomMap getPositionMaker={setPosition} />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="button-primary"
                    onClick={handleXacNhan}
                >
                    Xác nhận
                </Button>
                <Button
                    className="button-primary"
                    onClick={handleClose}
                >
                    Hủy
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalChonToaDo