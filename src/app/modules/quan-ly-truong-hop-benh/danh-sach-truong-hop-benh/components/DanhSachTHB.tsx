
import { OCTTable } from '@oceantech/oceantech-ui';
import { useContext, useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import AppContext from '../../../../AppContext';
import { TYPE } from '../../../utils/Constant';
import { formatDataViewTHB } from '../../../utils/FunctionUtils';
import { configTable, tablePagination } from '../../../utils/models';
import { DanhSachTHBColumns, INIT_TRUONG_HOP_BENH } from '../constants/constant';
import { TruongHopBenh } from '../model/Model';
import { getThongTinTruongHopBenh } from '../servives/Services';
import ThongTinThb from './ThongTinThb';

type Props = {
    handleClose: () => void
    data: any
    configTable: configTable
    setSearchObject: React.Dispatch<any>
    setDataSelected: (data: TruongHopBenh) => void
}

export default function DanhSachTHBModal({
    handleClose,
    data,
    configTable,
    setSearchObject,
    setDataSelected
}: Props) {

    const { setPageLoading } = useContext(AppContext);
    const [dataRow, setDataRow] = useState<TruongHopBenh>(INIT_TRUONG_HOP_BENH);

    const handleChangePagination = (table: tablePagination) => {
        setSearchObject((prev: any) => {
            return {
                ...prev,
                PageNumber: table?.pageIndex,
                PageSize: table?.pageSize || prev.PageSize,
            }
        })
    }

    const getThongTinChiTietTHB = async (id: string) => {
        try {
            setPageLoading(true);
            const { data } = await getThongTinTruongHopBenh(id);
            setDataRow(formatDataViewTHB(data.data));
        } catch (error) {
            console.error(error)
        }
        finally {
            setPageLoading(false);
        }
    }

    const handleSelectTable = (row: any[]) => {
        getThongTinChiTietTHB(row[0]?.truongHopBenhId);
    }

    const handleSelectTHB = () => {
        setDataSelected(dataRow)
        handleClose()
    }

    useEffect(() => {
        const truongHopBenhId = data?.[0]?.truongHopBenhId;
        if (truongHopBenhId) {
            getThongTinChiTietTHB(truongHopBenhId);
        }
    }, []);

    return (
        <Modal
            onHide={handleClose}
            show
            centered
            animation
            contentClassName=' spaces width-90 h-auto mx-auto rounded-8'
            className='bg-backdrop-dark'
            fullscreen
            size='xl'
        >
            <Modal.Header closeButton>
                <h3>Danh sách trường hợp bệnh</h3>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xs={4}>
                        <OCTTable
                            data={data}
                            columns={DanhSachTHBColumns}
                            justFilter
                            noToolbar
                            setSearchObject={handleChangePagination}
                            type={TYPE.SINGLE}
                            totalPages={configTable?.totalPages}
                            totalElements={configTable?.totalElements}
                            numberOfElements={configTable?.numberOfElements}
                            setDataChecked={handleSelectTable}
                        />
                    </Col>
                    <Col xs={8}>
                        <ThongTinThb dataRow={dataRow} />
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className="button-primary"
                    onClick={handleSelectTHB}
                >
                    Chọn đối tượng
                </Button>
                <Button
                    className="button-primary"
                    onClick={handleClose}
                >
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    )
}