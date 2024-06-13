import { Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import AppContext from "../../AppContext";
import { CURENT_STATUS, TYPE_TEST_CODE } from "../quan-ly-truong-hop-benh/danh-sach-truong-hop-benh/config/config";
import { CO_SU_DUNG_VAXIN, LAY_MAU_XN } from "../quan-ly-truong-hop-benh/danh-sach-truong-hop-benh/constants/constant";
import { formatDataViewTHB } from "../utils/FunctionUtils";
import BienPhapPhongChongBox from "./components/BienPhapPhongChongBox";
import ChanDoanBox from "./components/ChanDoanBox";
import CoSoDieuTriBox from "./components/CoSoDieuTriBox";
import DanhSachBenhNhanBox from "./components/DanhSachBenhNhanBox";
import KetThucODichBox from "./components/KetThucODichBox";
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
import { INITIAL_THONG_TIN_O_DICH } from "./constants/constants";
import { IThongTinODich } from "./models/quanLyODichModels";
import { addNewOdich, deleteOdich, editODich, getThongTinODich, ketThucODich } from "./services/services";
import "./styles/quanLyODich.scss";

export const ThemMoiODich = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const { setPageLoading } = useContext(AppContext)
    const [ketThucOdich, setKetThucOdich] = useState(false);
    const [dataOdich, setDataODich] = useState(INITIAL_THONG_TIN_O_DICH)

    const OdichSchema = Yup.object().shape({
        oDich: Yup.object().shape({
            tinh: Yup.object().shape({
                id: Yup.string().nullable().required("Bắt buộc nhập")
            }),
            huyen: Yup.object().shape({
                id: Yup.string().nullable().required("Bắt buộc nhập")
            }),
            xa: Yup.object().shape({
                xaId: Yup.string().nullable().required("Bắt buộc nhập")
            }),
            trangThai: Yup.string().nullable().required("Bắt buộc nhập"),
            tenODich: Yup.string().required("Bắt buộc nhap").nullable(),
            ngayKhoiPhatThbDauTien: Yup.string().required("Bắt buộc nhập").nullable(),
            ...ketThucOdich && {
                ngayNhanBaoCao: Yup.string().required("Bắt buộc nhập").nullable(),
                ngayKhoiPhatThbCuoiCung: Yup.string().required("Bắt buộc nhập").nullable(),
                ngayKetThucODich: Yup.string().required("Bắt buộc nhập").nullable(),
            }
        }),
        doiTuongMacBenh: Yup.object().shape({
            hoTen: Yup.string().required("Bắt buộc nhập").nullable(),
            ngaySinh: Yup.string().nullable().required("Bắt buộc nhập"),
            danToc: Yup.object().nullable().required("Bắt buộc nhập"),
            ngheNghiep: Yup.object().nullable().required("Bắt buộc nhập"),
            tinhHienNay: Yup.object().nullable().required("Bắt buộc nhập"),
            huyenHienNay: Yup.object().nullable().required("Bắt buộc nhập"),
            xaHienNay: Yup.object().nullable().required("Bắt buộc nhập"),
            cmnd: Yup.string().when("haveCmnd", {
                is: true,
                then: Yup.string().nullable().required("Bắt buộc nhập"),
                otherwise: Yup.string().nullable().notRequired()
            }),
            dienThoai: Yup.string().when("haveDienThoai", {
                is: true,
                then: Yup.string().nullable().required("Bắt buộc nhập"),
                otherwise: Yup.string().nullable().notRequired()
            }),
            diaChiHienNay: Yup.string().nullable().required("Bắt buộc nhập"),
        }),
        truongHopBenh: Yup.object().shape({
            tinhTrangHienNay: Yup.string().required("Bắt buộc nhập").nullable(),
            ngayNhapVien: Yup.string().required("Bắt buộc nhập").nullable(),
            phanLoaiChanDoan: Yup.string().required("Bắt buộc nhập").nullable(),
            ngayThucHienXn: Yup.string().when("layMauXetNghiem", {
                is: LAY_MAU_XN,
                then: Yup.string().nullable().required("Bắt buộc nhập"),
                otherwise: Yup.string().nullable().notRequired()
            }),
            donViXetNghiemObject: Yup.object().when("layMauXetNghiem", {
                is: LAY_MAU_XN,
                then: Yup.object().nullable().required("Bắt buộc nhập"),
                otherwise: Yup.object().nullable().notRequired()
            }),
            loaiXetNghiemKhac: Yup.string().when("loaiXetNghiem", {
                is: TYPE_TEST_CODE.LOAI_KHAC,
                then: Yup.string().nullable().required("Bắt buộc nhập"),
                otherwise: Yup.string().nullable().notRequired()
            }),
            tinhTrangKhac: Yup.string().when("tinhTrangHienNay", {
                is: `${CURENT_STATUS.TINH_TRANG_KHAC}`,
                then: Yup.string().nullable().required("Bắt buộc nhập"),
                otherwise: Yup.string().nullable().notRequired()
            }),
            benhVienChuyenToi: Yup.object().when("tinhTrangHienNay", {
                is: `${CURENT_STATUS.CHUYEN_VIEN}`,
                then: Yup.object().nullable().required("Bắt buộc nhập"),
                otherwise: Yup.object().nullable().notRequired()
            }),
            chanDoanRaVien: Yup.string().when("tinhTrangHienNay", {
                is: `${CURENT_STATUS.RA_VIEN}`,
                then: Yup.string().nullable().required("Bắt buộc nhập"),
                otherwise: Yup.string().nullable().notRequired()
            }),
            soLanSuDung: Yup.string().when("suDungVacXin", {
                is: CO_SU_DUNG_VAXIN,
                then: Yup.string().nullable().required("Bắt buộc nhập"),
                otherwise: Yup.string().nullable().notRequired()
            }),
            coSoDieuTri: Yup.object().required("Bắt buộc nhập").nullable(),
            coSoQuanLy: Yup.object().required("Bắt buộc nhập").nullable(),
            noiPhatHien: Yup.string().required("Bắt buộc nhập").nullable(),
        }),
        soCaMacList: Yup.array().of(
            Yup.object().shape({
                tenDiaPhuong: Yup.string().required("Bắt buộc nhập").nullable(),
                ngayCapNhat: Yup.string().required("Bắt buộc nhập").nullable(),
                soMac: Yup.string().required("Bắt buộc nhập").nullable(),
                soChet: Yup.string().required("Bắt buộc nhập").nullable(),
            })),
        xetNghiemList: Yup.array().of(
            Yup.object().shape({
                tenDiaPhuong: Yup.string().required("Bắt buộc nhập").nullable(),
                ngayCapNhat: Yup.string().required("Bắt buộc nhập").nullable(),
                soDuongTinh: Yup.string().required("Bắt buộc nhập").nullable(),
                soXn: Yup.string().required("Bắt buộc nhập").nullable(),
            })),
        bienPhapTrienKhaiList: Yup.array().of(
            Yup.object().shape({
                hdPhongChongDich: Yup.object().required("Bắt buộc nhập").nullable(),
                ngayCapNhat: Yup.string().required("Bắt buộc nhập").nullable(),
                yKienDeNghi: Yup.string().required("Bắt buộc nhập").nullable(),
            })),
    });

    const formatDataSend = (data: IThongTinODich): IThongTinODich => {
        const {
            coSoDieuTri,
            coSoQuanLy,
            capDoBenh,
            donViXetNghiem,
            benhVienChuyenToi,
            donViXetNghiemObject,
            ...thbValue
        } = data.truongHopBenh;
        const { tinh, huyen, xa, ...oDichValue } = data.oDich;
        const {
            tinhHienNay,
            xaHienNay,
            huyenHienNay,
            tinhIdThuongTru,
            xaThuongTru,
            huyenThuongTru,
            danToc,
            ...dtmbValue
        } = data.doiTuongMacBenh;

        return {
            ...data,
            oDich: {
                ...oDichValue,
                tinhId: data?.oDich?.tinh?.id,
                huyenId: data?.oDich?.huyen?.id,
                xaId: data?.oDich?.xa?.xaId,
            },
            truongHopBenhId: data?.truongHopBenh?.truongHopBenhId,
            truongHopBenh: {
                ...thbValue,
                capDoBenhId: data?.truongHopBenh?.capDoBenh?.id,
                benhVienChuyenToiId: data?.truongHopBenh?.benhVienChuyenToi?.id,
                donViXetNghiem: data?.truongHopBenh?.donViXetNghiemObject?.id,
                coSoQuanLyId: data?.truongHopBenh?.coSoQuanLy?.id,
                donViCongTacNbcId: data?.truongHopBenh?.donViCongTacNbc?.id,
                coSoDieuTriId: data?.truongHopBenh?.coSoDieuTri?.id,
                benhTruyenNhiemId: data?.oDich?.benhTruyenNhiemId,
            },
            doiTuongMacBenh: {
                ...dtmbValue,
                ngheNghiepId: data?.doiTuongMacBenh?.ngheNghiep?.id,
                danTocId: data?.doiTuongMacBenh?.danToc?.id,
                tinhIdHienNay: data?.doiTuongMacBenh?.tinhHienNay?.id,
                huyenIdHienNay: data?.doiTuongMacBenh?.huyenHienNay?.id,
                xaIdHienNay: data?.doiTuongMacBenh?.xaHienNay?.xaId,
                tinhIdThuongTru: data?.doiTuongMacBenh?.tinhThuongTru?.id,
                xaIdThuongTru: data?.doiTuongMacBenh?.xaThuongTru?.xaId,
                huyenIdThuongTru: data?.doiTuongMacBenh?.huyenThuongTru?.id,
            },
            bienPhapTrienKhaiList: data?.bienPhapTrienKhaiList.map(item => {
                return {
                    ngayCapNhat: item?.ngayCapNhat,
                    yKienDeNghi: item?.yKienDeNghi,
                    hdPhongChongDichId: item?.hdPhongChongDich?.id,
                    oDichBienPhapTrienKhaiId: item?.oDichBienPhapTrienKhaiId,
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

    const formatDataView = (data: IThongTinODich) => {
        return {
            ...data,
            oDich: {
                ...INITIAL_THONG_TIN_O_DICH.oDich,
                ...data.oDich,
                tinh: {
                    id: data?.oDich?.tinhId,
                    tenTinh: data?.oDich?.tinhTen
                },
                huyen: {
                    id: data?.oDich?.huyenId,
                    tenHuyen: data?.oDich?.huyenTen
                },
                xa: {
                    xaId: data?.oDich?.xaId,
                    tenXa: data?.oDich?.xaTen
                },
            },
            ...formatDataViewTHB(data),
            bienPhapTrienKhaiList: data?.bienPhapTrienKhaiList.map((item) => {

                return {
                    ...item,
                    hdPhongChongDich: {
                        id: item.hdPhongChongDichId,
                        tenHoatDong: item.hdPhongChongDichTen
                    }
                }
            })
        }
    }

    const handleSubmit = async (values: IThongTinODich) => {
        try {
            setPageLoading(true);
            if (ketThucOdich && id) {
                await ketThucODich(id, formatDataSend(values).oDich);
                toast.success("Kết thúc ổ dịch thành công!");
                return;
            }
        
            if (id) {
                await editODich(id, formatDataSend(values));
                toast.success("Cập nhật ổ dịch thành công!");
            } else {
                await addNewOdich(formatDataSend(values));
                toast.success("Thêm mới ổ dịch thành công!");
            }
        
            navigate(-1)
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setPageLoading(false);
        }
    }

    const handleDeleteODich = async () => {
        try {
            setPageLoading(true);
            if (id) {
                await deleteOdich(id);
                toast.success("Xoá ổ dịch thành công!");
                navigate(-1)
            }
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setPageLoading(false);
        }
    }

    const getThongTinOdich = async () => {
        if (!id) return;

        try {
            setPageLoading(true);
            const { data } = await getThongTinODich(id);
            setDataODich(formatDataView(data?.data));
        } catch (error) {
            console.error(error);
        } finally {
            setPageLoading(false);
        }
    }

    useEffect(() => {
        getThongTinOdich()
    }, [])

    return (
        <Formik
            initialValues={dataOdich}
            onSubmit={handleSubmit}
            validationSchema={OdichSchema}
            enableReinitialize
        >
            {formikProps => (
                <Form>
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
                        <Row className="spaces mt-15">
                            <Col xs={12} sm={12} md={12} lg={12}>
                                {id && <KetThucODichBox />}
                            </Col>
                        </Row>
                        <div className="section-container spaces mt-15 gap-10 d-flex justify-content-end">
                            <Button
                                className="button-primary"
                                type="submit"
                                onClick={() => setKetThucOdich(false)}
                            >
                                Lưu
                            </Button>
                            {id &&
                                <>
                                    <Button
                                        className="button-primary"
                                        type="submit"
                                        onClick={() => setKetThucOdich(true)}
                                    >
                                        Xác nhận kết thúc
                                    </Button>
                                    <Button
                                        className="button-primary"
                                        type="submit"
                                        onClick={handleDeleteODich}
                                    >
                                        Xóa
                                    </Button>
                                </>
                            }
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