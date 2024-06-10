import { Form, Formik } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import { OdichSchema } from "./constants/constants";
import { addNewOdich } from "../quan-ly-truong-hop-benh/danh-sach-truong-hop-benh/servives/Services";
import BienPhapPhongChongBox from "./components/BienPhapPhongChongBox";
import ChanDoanBox from "./components/ChanDoanBox";
import CoSoDieuTriBox from "./components/CoSoDieuTriBox";
import DanhSachBenhNhanBox from "./components/DanhSachBenhNhanBox";
import MoTaTomTatBox from "./components/MoTaTomTatBox";
import SoMacTuVongBox from "./components/SoMacTuVongBox";
import SoMauXetNghiemBox from "./components/SoMauXetNghiemBox";
import ThongTinDoiTuongBox from "./components/ThongTinDoiTuongBox";
import ThongTinODichBox from "./components/ThongTinODichBox";
import ThongTinVeTiemUongVacXin from "./components/ThongTinVeTiemUongVacXin";
import TienXuBenhNhanBox from "./components/TienXuBenhNhanBox";
import TienXuDichTeBox from "./components/TienXuDichTeBox";
import TinhTrangBox from "./components/TinhTrangBox";
import XaPhuongQuanLyBox from "./components/XaPhuongQuanLyBox";
import { IThongTinODich } from "./models/quanLyODichModels";
import { INITIAL_THONG_TIN_O_DICH } from "./constants/constants";
import "./styles/quanLyODich.scss";
import { useParams } from "react-router-dom";
import { getThongTinODich } from "./services/services";
import { useEffect } from "react";

export const ThemMoiODich = () => {
    const { id } = useParams();

    const formatData = (data: IThongTinODich) => {
        return {
            ...data,
            oDich: {
                tenODich: data?.oDich?.tenODich,
                tinhId: data?.oDich?.tinh?.id,
                huyenId: data?.oDich?.huyen?.id,
                xaId: data?.oDich?.xa?.xaId,
                trangThai: data?.oDich?.trangThaiObject?.code,
                ngayKhoiPhatThbDauTien: data?.oDich?.ngayKhoiPhatThbDauTien,
                benhTruyenNhiemId: data?.oDich?.benhTruyenNhiemId,
                xacDinhThbDauTien: data?.truongHopBenh?.doiTuongMacBenhId,
            },
            truongHopBenhId: data?.truongHopBenh?.truongHopBenhId,
            truongHopBenh: {
                benhTruyenNhiemId: data?.oDich?.benhTruyenNhiemId,
                doiTuongMacBenhId: data?.truongHopBenh?.doiTuongMacBenhId,
                capDoBenhId: data?.truongHopBenh?.capDoBenh?.id,
                tinhTrangHienNay: data?.truongHopBenh?.tinhTrangHienNay,
                ngayKhoiPhat: data?.truongHopBenh?.ngayKhoiPhat,
                ngayNhapVien: data?.truongHopBenh?.ngayNhapVien,
                ngayRaVien: data?.truongHopBenh?.ngayRaVien,
                chanDoanRaVien: data?.truongHopBenh?.chanDoanRaVien,
                benhVienChuyenToiId: data?.truongHopBenh?.benhVienChuyenToi?.id,
                tinhTrangKhac: data?.truongHopBenh?.tinhTrangKhac,
                phanLoaiChanDoan: data?.truongHopBenh?.phanLoaiChanDoan,
                layMauXetNghiem: data?.truongHopBenh?.layMauXetNghiem,
                suDungVacXin: data?.truongHopBenh?.suDungVacXin,
                soLanSuDung: data?.truongHopBenh?.soLanSuDung,
                loaiXetNghiem: data?.truongHopBenh?.loaiXetNghiem,
                loaiXetNghiemKhac: data?.truongHopBenh?.loaiXetNghiemKhac,
                dinhLoaiXetNghiemKhac: data?.truongHopBenh?.dinhLoaiXetNghiemKhac,
                ketQuaXetNghiem: data?.truongHopBenh?.ketQuaXetNghiem,
                ngayThucHienXn: data?.truongHopBenh?.ngayThucHienXn,
                ngayTraKetQuaXn: data?.truongHopBenh?.ngayTraKetQuaXn,
                donViXetNghiem: data?.truongHopBenh?.donViXetNghiemObject?.id,
                benhChanDoanPhu: data?.truongHopBenh?.benhChanDoanPhu,
                chanDoanBienChung: data?.truongHopBenh?.chanDoanBienChung,
                tienSuDichTe: data?.truongHopBenh?.tienSuDichTe,
                ghiChu: data?.truongHopBenh?.ghiChu,
                tenNguoiBaoCao: data?.truongHopBenh?.tenNguoiBaoCao,
                emailNguoiBaoCao: data?.truongHopBenh?.emailNguoiBaoCao,
                donViCongTacNbcId: data?.truongHopBenh?.donViCongTacNbc?.id,
                dienThoaiNguoiBaoCao: data?.truongHopBenh?.dienThoaiNguoiBaoCao,
                noiPhatHien: data?.truongHopBenh?.noiPhatHien,
                coSoDieuTriId: data?.truongHopBenh?.coSoDieuTri?.id,
                coSoQuanLyId: data?.truongHopBenh?.coSoQuanLy?.id,
                trangThaiPhanHoi: data?.truongHopBenh?.trangThaiPhanHoi,
                trangThaiTheoDoi: data?.truongHopBenh?.trangThaiTheoDoi,
            },
            doiTuongMacBenh: {
                hoTen: data?.doiTuongMacBenh?.hoTen,
                ngaySinh: data?.doiTuongMacBenh?.ngaySinh,
                ngheNghiepId: data?.doiTuongMacBenh?.ngheNghiep?.id,
                danTocId: data?.doiTuongMacBenh?.danToc?.id,
                gioiTinh: data?.doiTuongMacBenh?.gioiTinh,
                haveCmnd: data?.doiTuongMacBenh?.haveCmnd,
                cmnd: data?.doiTuongMacBenh?.cmnd,
                haveDienThoai: data?.doiTuongMacBenh?.haveDienThoai,
                dienThoai: data?.doiTuongMacBenh?.dienThoai,
                noiLamViecHocTap: data?.doiTuongMacBenh?.noiLamViecHocTap,
                tinhIdHienNay: data?.doiTuongMacBenh?.tinhHienNay?.id,
                huyenIdHienNay: data?.doiTuongMacBenh?.huyenHienNay?.id,
                xaIdHienNay: data?.doiTuongMacBenh?.xaHienNay?.xaId,
                diaChiHienNay: data?.doiTuongMacBenh?.diaChiHienNay,
                tinhIdThuongTru: data?.doiTuongMacBenh?.tinhThuongTru?.id,
                huyenIdThuongTru: data?.doiTuongMacBenh?.huyenThuongTru?.id,
                xaIdThuongTru: data?.doiTuongMacBenh?.xaThuongTru?.xaId,
                diaChiThuongTru: data?.doiTuongMacBenh?.diaChiThuongTru,
            },
            bienPhapTrienKhaiList: data?.bienPhapTrienKhaiList.map(item => {
                return {
                    yKienDeNghi: item.yKienDeNghi,
                    hdPhongChongDichId: item.hdPhongChongDich?.id
                }
            }),
            soCaMacList: data?.soCaMacList.map(item => {
                return {
                    ...item,
                    tinhId: data?.oDich?.tinh?.id,
                    huyenId: data?.oDich?.huyen?.id,
                    xaId: data?.oDich?.xa?.xaId
                }
            }),
            xetNghiemList: data?.xetNghiemList.map(item => {
                return {
                    ...item,
                    tinhId: data?.oDich?.tinh?.id,
                    huyenId: data?.oDich?.huyen?.id,
                    xaId: data?.oDich?.xa?.xaId
                }
            })
        }
    }

    const handleSubmit = async (values: IThongTinODich) => {
        const res = addNewOdich(formatData(values) as IThongTinODich)
    }  

    const getThongTinOdich = async () => {
        // const res = (id && await getThongTinODich(id)) || {}
        //xu lý lay hien thi thong tin o dich
    }

    useEffect(() => {
        getThongTinOdich()
    }, [])

    return (
        <Formik
            initialValues={INITIAL_THONG_TIN_O_DICH}
            onSubmit={handleSubmit}
            validationSchema={OdichSchema}
        >
            {formikProps => (
                <Form>
                    <div className="spaces my-15 them-moi-o-dich-container">
                        <ThongTinODichBox />
                        <Row className="spaces mt-15">
                            <Col xs={12} sm={12} md={6} lg={6}>
                                <ThongTinDoiTuongBox  />
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
                                type="submit"
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
                </Form>
            )}
        </Formik>
    )
}

export default ThemMoiODich