import { Button, Col, Row } from "react-bootstrap";
import ThongTinODichBox from "./components/ThongTinODichBox";
import TienXuDichTeBox from "./components/TienXuDichTeBox";
import TienXuBenhNhanBox from "./components/TienXuBenhNhanBox";
import ThongTinDoiTuongBox from "./components/ThongTinDoiTuongBox";
import ThongTinVeTiemUongVacXin from "./components/ThongTinVeTiemUongVacXin";
import TinhTrangBox from "./components/TinhTrangBox";
import ChanDoanBox from "./components/ChanDoanBox";
import XaPhuongQuanLyBox from "./components/XaPhuongQuanLyBox";
import CoSoDieuTriBox from "./components/CoSoDieuTriBox";
import MoTaTomTatBox from "./components/MoTaTomTatBox";
import BienPhapPhongChongBox from "./components/BienPhapPhongChongBox";
import DanhSachBenhNhanBox from "./components/DanhSachBenhNhanBox";
import SoMacTuVongBox from "./components/SoMacTuVongBox";
import SoMauXetNghiemBox from "./components/SoMauXetNghiemBox";
import "./styles/quanLyODich.scss";

export const ThemMoiODich = () => {
    return (
        <div className="spaces my-15 them-moi-o-dich-container">
            <ThongTinODichBox />
            <Row className="spaces mt-15">
                <Col xs={12} sm={12} md={6} lg={6}>
                    <ThongTinDoiTuongBox />
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <TienXuBenhNhanBox />
                </Col>
            </Row>
            <Row className="spaces mt-15">
                <Col xs={12} sm={12} md={12} lg={12}>
                    <TienXuDichTeBox />
                </Col>
            </Row>
            <Row className="spaces mt-15">
                <Col xs={12} sm={12} md={6} lg={6}>
                    <ThongTinVeTiemUongVacXin />
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <TinhTrangBox />
                </Col>
            </Row>
            <Row className="spaces mt-15">
                <Col xs={12} sm={12} md={12} lg={12}>
                    <ChanDoanBox />
                </Col>
            </Row>
            <Row className="spaces mt-15">
                <Col xs={12} sm={12} md={6} lg={6}>
                    <CoSoDieuTriBox />
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <XaPhuongQuanLyBox />
                </Col>
            </Row>
            <Row className="spaces mt-15">
                <Col xs={12} sm={12} md={6} lg={6}>
                    <SoMacTuVongBox />
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <SoMauXetNghiemBox />
                </Col>
            </Row>
            <Row className="spaces mt-15">
                <Col xs={12} sm={12} md={12} lg={12}>
                    <MoTaTomTatBox />
                </Col>
            </Row>
            <Row className="spaces mt-15">
                <Col xs={12} sm={12} md={12} lg={12}>
                    <BienPhapPhongChongBox />
                </Col>
            </Row>
            <Row className="spaces mt-15">
                <Col xs={12} sm={12} md={12} lg={12}>
                    <DanhSachBenhNhanBox />
                </Col>
            </Row>
            <div className="section-container spaces mt-15 gap-10 d-flex justify-content-end">
                <Button
                    className="button-primary"
                    onClick={() => { }}
                >
                    Lưu
                </Button>
                <Button
                    className="button-primary"
                    onClick={() => { }}
                >
                    Xuất báo cáo
                </Button>
            </div>
        </div>
    )
}

export default ThemMoiODich