import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import TabMenu from "../../../component/tabs/TabMenu";
import { hanhChinhSchema, KeyTab, tabConfig } from "../constants/constant";
import { initialTruongHopBenh, ITruongHopBenh } from "../model/Model";
import ThongTinChanDoanTab from "./ThongTinChanDoanTab";
import ThongTinGhiNhanTab from "./ThongTinGhiNhan";
import ThongTinHanhChinhTab from "./ThongTinHanhChinhTab";

type TProps = {
    handleClose: () => void;
    dataRow?: any;
};

const NhapTruongHopBenhModal = (props: TProps) => {
    const { dataRow, handleClose } = props;
    const [activeTab, setActiveTab] = useState(KeyTab.TT_HANH_CHINH)
    const [validationSchema, setValidationSchema] = useState(hanhChinhSchema);
    const [prevTab, setPrevTab] = useState<any>(null)

    useEffect(() => {
        const { schema, prevTab } = tabConfig[activeTab] || {};
        setValidationSchema(schema || null);
        setPrevTab(prevTab || null);
    }, [activeTab]);


    const handleSubmit = async (values: ITruongHopBenh) => {
        const { nextTab } = tabConfig[activeTab] || {};
        if (nextTab) {
            setActiveTab(nextTab);
        } else {
            handleClose();
        }
    };

    const tabList = [
        {
            eventKey: KeyTab.TT_HANH_CHINH,
            title: "Thông tin hành chính",
            component: <ThongTinHanhChinhTab />
        },
        {
            eventKey: KeyTab.TT_CHAN_DOAN,
            title: "Thông tin chẩn đoán",
            component: <ThongTinChanDoanTab />
        },
        {
            eventKey: KeyTab.TT_GHI_NHAN,
            title: "Thông tin ghi nhận",
            component: <ThongTinGhiNhanTab />
        },
    ];

    return (
        <Modal
            show
            onHide={handleClose}
            centered
            animation
            size="xl"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <span className="spaces pl-16">
                        {dataRow?.name ? "#Cập nhật" : "#Thêm mới"} trường hợp bệnh
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialTruongHopBenh}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {formikProps => (
                        <Form>
                            <TabMenu
                                danhsachTabs={tabList}
                                setCurrentTab={setActiveTab}
                                defaultActiveKey={activeTab} 
                                />
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='fw-bold'>Lưu ý các dấu <span className='text-danger'>* </span> là trường bắt buộc nhập</div>
                                </div>
                                <div className="d-flex gap-2">
                                    <Button className="button-primary" onClick={() => setActiveTab(prevTab)}>Quay lại
                                    </Button>
                                    <Button
                                        className="button-primary"
                                        type="submit">
                                        {activeTab === KeyTab.TT_GHI_NHAN ? "Lưu" : "Tiếp tục"}
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

export default NhapTruongHopBenhModal;