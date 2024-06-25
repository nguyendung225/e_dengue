import { OCTAutocomplete, OCTTextValidator } from "@oceantech/oceantech-ui"
import { useFormikContext } from "formik"
import { useContext, useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import { toast } from "react-toastify"
import AppContext from "../../../AppContext"
import { KEY_LOCALSTORAGE } from "../../auth/core/_consts"
import SelectSearchBox from "../../quan-ly-truong-hop-benh/danh-sach-truong-hop-benh/components/SelectSearchBox"
import { getThongTinTruongHopBenh } from "../../quan-ly-truong-hop-benh/danh-sach-truong-hop-benh/servives/Services"
import { searchThbOdichByPage } from "../../quan-ly-truong-hop-benh/tim-kiem-truong-hop-benh/services/TimKiemThbServices"
import { getListDmCapDoBenh, getListHuyenByTinhId, getListTinh, getListXaByHuyenId } from "../../services"
import { localStorageItem } from "../../utils/LocalStorage"
import { columnTHB, TRANG_THAI } from "../constants/constants"
import { IThongTinODich } from "../models/quanLyODichModels"
import { TruongHopBenh } from "../../quan-ly-truong-hop-benh/danh-sach-truong-hop-benh/model/Model"
import { handleChangeHuyen, handleChangeTinh, handleChangeXa } from "../../utils/FunctionUtils"
import { useParams } from "react-router-dom"
import TextValidator from "../../component/input-field/TextValidator"

export const ThongTinODichBox = () => {
    const { id } = useParams();
    const { values, errors, touched, setFieldValue, setValues, handleChange } = useFormikContext<IThongTinODich>()
    const { setPageLoading } = useContext(AppContext);
    const dataUser = localStorageItem.get(KEY_LOCALSTORAGE.USER_INFOMATION)
    const [searchObject, setSearchObject] = useState<any>({
        PageNumber: 1,
        PageSize: 10,
        BenhIds: 37,// benh sxh
        TinhId: dataUser?.tinhId,
        HuyenId: dataUser?.huyenId,
        XaId: dataUser?.xaId,
    })
    const existTHB = Boolean(values?.doiTuongMacBenh?.doiTuongMacBenhId)
    const formatData = (data: TruongHopBenh) => {
        let newData = {
            truongHopBenh: {
                ...data?.truongHopBenh,
                capDoBenh: {
                    id: data?.truongHopBenh?.capDoBenhId,
                    tenCapDo: data?.truongHopBenh?.capDoBenhTen
                },
                benhVienChuyenToi: {
                    id: data?.truongHopBenh?.benhVienChuyenToiId,
                    tenCoSo: data?.truongHopBenh?.benhVienChuyenToiTen
                },
                donViXetNghiemObject: {
                    id: data?.truongHopBenh?.donViXetNghiem,
                    tenCoSo: data?.truongHopBenh?.donViXetNghiemTen
                },
                donViCongTacNbc: {
                    id: data?.truongHopBenh?.donViCongTacNbcId,
                    tenCoSo: data?.truongHopBenh?.donViCongTacNbcTen
                },
                coSoDieuTri: {
                    id: data?.truongHopBenh?.coSoDieuTriId,
                    tenCoSo: data?.truongHopBenh?.coSoDieuTriTen
                },
                coSoQuanLy: {
                    id: data?.truongHopBenh?.coSoQuanLyId,
                    tenCoSo: data?.truongHopBenh?.coSoQuanLyTen
                }
            },
            doiTuongMacBenh: {
                ...data?.doiTuongMacBenh,
                ngheNghiep: {
                    id: data?.doiTuongMacBenh?.ngheNghiepId,
                    tenNghe: data?.doiTuongMacBenh?.ngheNghiepTen
                },
                danToc: {
                    id: data?.doiTuongMacBenh?.danTocId,
                    tenDanToc: data?.doiTuongMacBenh?.danTocTen
                },
                tinhHienNay: {
                    id: data?.doiTuongMacBenh?.tinhIdHienNay,
                    tenTinh: data?.doiTuongMacBenh?.tinhTenHienNay
                },
                huyenHienNay: {
                    id: data?.doiTuongMacBenh?.huyenIdHienNay,
                    tenHuyen: data?.doiTuongMacBenh?.huyenTenHienNay
                },
                xaHienNay: {
                    xaId: data?.doiTuongMacBenh?.xaIdHienNay,
                    tenXa: data?.doiTuongMacBenh?.xaTenHienNay
                },
                tinhThuongTru: {
                    id: data?.doiTuongMacBenh?.tinhIdThuongTru,
                    tenTinh: data?.doiTuongMacBenh?.tinhTenThuongTru
                },
                huyenThuongTru: {
                    id: data?.doiTuongMacBenh?.huyenIdThuongTru,
                    tenHuyen: data?.doiTuongMacBenh?.huyenTenThuongTru
                },
                xaThuongTru: {
                    xaId: data?.doiTuongMacBenh?.xaIdThuongTru,
                    tenXa: data?.doiTuongMacBenh?.xaTenThuongTru
                }
            },
            isCreateNewThb: false,
            oDich: {
                ...values?.oDich,
                tinh: {
                    id: data?.doiTuongMacBenh?.tinhIdHienNay,
                    tenTinh: data?.doiTuongMacBenh?.tinhTenHienNay
                },
                huyen: {
                    id: data?.doiTuongMacBenh?.huyenIdHienNay,
                    tenHuyen: data?.doiTuongMacBenh?.huyenTenHienNay
                },
                xa: {
                    xaId: data?.doiTuongMacBenh?.xaIdHienNay,
                    tenXa: data?.doiTuongMacBenh?.xaTenHienNay
                },
                ngayKhoiPhatThbDauTien: data?.truongHopBenh.ngayKhoiPhat,
                xacDinhThbDauTien: data?.truongHopBenh?.doiTuongMacBenhId,
            },
        };
        return newData
    }

    const handleSelectTHB = async (data: any) => {
        getThongTinChiTietTHB(data?.[0]?.truongHopBenhId)
    }

    const setTTODich = () => {
        setValues({
            ...values,
            oDich: {
                ...values.oDich,
                tinh: {
                    id: dataUser?.tinhId,
                    tenTinh: dataUser?.tenTinh
                },
                huyen: {
                    id: dataUser?.huyenId,
                    tenHuyen: dataUser?.tenHuyen
                },
                xa: {
                    id: dataUser?.xaId,
                    tenXa: dataUser?.tenXa
                }
            }
        })
    }

    const getThongTinChiTietTHB = async (id: string) => {
        try {
            setPageLoading(true);
            const { data } = await getThongTinTruongHopBenh(id);
            setValues({
                ...values, ...formatData(data?.data),
            });
        } catch (error) {
            console.error(error);
            toast.error(error as string);
        }
        finally {
            setPageLoading(false);
        }
    }

    const handlechangeTinhODich = (option: any) => {
        handleChangeTinh(setValues, 'oDich', 'tinh', 'huyen', 'xa', option)
        setSearchObject({ ...searchObject, TinhId: option?.id })
    }

    const handlechangeHuyenODich = (option: any) => {
        handleChangeHuyen(setValues, 'oDich', 'huyen', 'xa', option)
        setSearchObject({ ...searchObject, HuyenId: option?.id })
    }

    const handlechangeXaODich = (option: any) => {
        handleChangeXa(setValues, 'oDich', 'xa', option)
        setSearchObject({ ...searchObject, XaId: option?.xaId })
    }

    const handleChangeNgayKhoiPhat = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue("oDich.ngayKhoiPhatThbDauTien", e.target.value)
        setSearchObject({ ...searchObject, TuNgayKhoiPhat: e.target.value })
    }

    useEffect(() => {
        setTTODich()
    }, [])

    return (
        <>
            <div className="section-container">
                <div className="spaces mb-10 fs-18 fw-bold text-uppercase color-dark-red">
                    Thông tin ổ dịch
                </div>
                <div className="border-top">
                    <Row className="spaces mt-5">
                        <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                            <OCTAutocomplete
                                lable="Tỉnh/TP"
                                searchFunction={getListTinh}
                                urlData='data.data'
                                getOptionLabel={(option) => option?.tenTinh}
                                options={[]}
                                name='oDich.tinh'
                                searchObject={{}}
                                onChange={handlechangeTinhODich}
                                isRequired
                                value={values.oDich?.tinh}
                                errors={(errors.oDich?.tinh as any)?.id}
                                touched={touched.oDich?.tinh}
                                isDisabled={Boolean(dataUser?.tinhId)}
                            />
                        </Col>
                        <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                            <OCTAutocomplete
                                lable="Quận/Huyện "
                                searchFunction={() => getListHuyenByTinhId(values.oDich?.tinh?.id)}
                                urlData='data.data'
                                getOptionLabel={(option) => option?.tenHuyen}
                                options={[]}
                                searchObject={{}}
                                value={values.oDich?.huyen}
                                isDisabled={!values.oDich?.tinh?.id || Boolean(dataUser?.huyenId)}
                                onChange={handlechangeHuyenODich}
                                dependencies={[values.oDich?.tinh]}
                                isRequired
                                errors={(errors.oDich?.huyen as any)?.id}
                                touched={touched.oDich?.huyen}
                            />
                        </Col>
                        <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                            <OCTAutocomplete
                                lable="Phường/Xã "
                                searchFunction={() => getListXaByHuyenId(values.oDich?.huyen?.id)}
                                urlData='data.data'
                                getOptionLabel={(option) => option?.tenXa}
                                options={[]}
                                searchObject={{}}
                                value={values.oDich?.xa}
                                isDisabled={!values.oDich?.huyen?.id || Boolean(dataUser?.xaId) || Boolean(id)}
                                onChange={handlechangeXaODich}
                                dependencies={[values?.oDich?.huyen]}
                                isRequired
                                errors={(errors.oDich?.xa as any)?.id}
                                touched={touched.oDich?.xa}
                            />
                        </Col>
                    </Row>
                    <Row className="spaces mt-10">
                        <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                            <OCTAutocomplete
                                lable="Trạng thái"
                                options={TRANG_THAI}
                                valueSearch={"code"}
                                value={values.oDich?.trangThai}
                                onChange={(option) => setFieldValue("oDich.trangThai", option?.code)}
                                isRequired
                                errors={errors.oDich?.trangThai}
                                touched={touched.oDich?.trangThai}
                                isDisabled={Boolean(id)}
                            />
                        </Col>
                        <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                            <OCTTextValidator
                                lable="Tổ/thôn/ấp/khu vực"
                                type="text"
                                isRequired
                                name="oDich.tenODich"
                                value={values?.oDich?.tenODich}
                                onChange={handleChange}
                                errors={errors?.oDich?.tenODich}
                                touched={touched?.oDich?.tenODich}
                            />
                        </Col>
                        <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                            <TextValidator
                                lable="Ngày khởi phát ổ dịch"
                                type="date"
                                isRequired
                                name="oDich.ngayKhoiPhatThbDauTien"
                                value={values.oDich?.ngayKhoiPhatThbDauTien}
                                onChange={handleChangeNgayKhoiPhat}
                                errors={errors?.oDich?.ngayKhoiPhatThbDauTien}
                                touched={touched?.oDich?.ngayKhoiPhatThbDauTien}
                            />
                        </Col>
                        <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                            <OCTAutocomplete
                                lable="Phân độ lâm sàng/ Phân loại thể bệnh"
                                searchFunction={getListDmCapDoBenh}
                                urlData='data.data'
                                getOptionLabel={(option) => option?.tenCapDo}
                                options={[]}
                                searchObject={{}}
                                isDisabled={Boolean(id)}
                            />
                        </Col>
                    </Row>
                    <Row className="spaces mt-10">
                        {
                            !Boolean(id) && <Col xs={12} sm={6} md={9} lg={12} className="spaces mt-5">
                                <SelectSearchBox
                                    lable="Tìm kiếm trường hợp bệnh"
                                    columns={columnTHB}
                                    service={searchThbOdichByPage}
                                    handleSelect={handleSelectTHB}
                                    searchObject={searchObject}
                                    disabled={existTHB}
                                />
                            </Col>
                        }
                    </Row>
                </div>
            </div>
        </>
    )
}

export default ThongTinODichBox