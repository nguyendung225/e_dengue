import { OCTAutocomplete, OCTTextValidator } from "@oceantech/oceantech-ui"
import { Button, Col, Row } from "react-bootstrap"
import { KTSVG } from "../../../../../_metronic/helpers"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFormikContext } from "formik";
import { ISearchObjectModel } from "../../models/TimKiemTruongHopBenhModels";
import { GENDER_OPTION, KQ_XET_NGHIEM, PHAN_LOAI_QUAN_LY, SEARCH_OBJECT_INIT, TINH_TRANG_HIEN_NAY } from "../constants/constants";
import LabelRequired from "../../../component/LabelRequired";
import { getListCoSoBaoCao, getListCoSoDieuTri, getListCoSoXetNghiem, getListHuyenByTinhId, getListNgheNghiep, getListTinh, getListXaByHuyenId } from "../../../services";
import { localStorageItem } from "../../../utils/LocalStorage";
import { KEY_LOCALSTORAGE } from "../../../auth/core/_consts";
import AsyncAutoComplete from "../../../component/input-field/AsyncAutoComplete";

const SearchAdvanceForm = () => {
    const [openSearchAdvance, setOpenSearchAdvance] = useState<boolean>(false);
    const location = useLocation();
    const { values, handleChange, errors, touched, setFieldValue, setValues } = useFormikContext<ISearchObjectModel>();
    const userData = localStorageItem.get(KEY_LOCALSTORAGE.USER_INFOMATION)

    const handleResetForm = () => {
        setValues({
            ...SEARCH_OBJECT_INIT,
            tinh: userData?.tinhInfo || null,
            huyen: userData?.huyenInfo || null,
            xa: userData?.xaInfo || null,
            gioiTinh: null,
            ngheNghiep: null,
        });
    }

    useEffect(() => {
        setValues({
            ...values,
            tinh: userData?.tinhInfo || null,
            huyen: userData?.huyenInfo || null,
            xa: userData?.xaInfo || null,
        })
    }, [])

    return (
        <>
            {location.pathname === "/tim-kiem-truong-hop-benh" && (
                <div className="spaces mt-14 rounded">
                    <div className="spaces my-10 fw-700 fs-16 color-dark-red text-uppercase">
                        Tìm kiếm trường hợp bệnh
                    </div>
                    <div>
                        <Row>
                            <Col xs={12} lg={8}>
                                <div className="flex flex-middle">
                                    <OCTTextValidator
                                        name="keyword"
                                        placeholder="Tìm kiếm theo họ tên/ mã số bệnh nhân/ CMND/ Số điện thoại"
                                        onChange={handleChange}
                                        className="spaces width-100"
                                        value={values?.keyword || ""}
                                    />
                                </div>
                            </Col>
                            <Col xs={12} lg={4}>
                                <div className="flex flex-middle flex-wrap gap-2 search-action">
                                    <Button className="button-primary spaces height-100 flex flex-middle" type='submit'>
                                        <KTSVG
                                            path="/media/svg/icons/search.svg"
                                            svgClassName="spaces h-14 w-14 color-white"
                                        />
                                        Tìm kiếm
                                    </Button>
                                    <Button
                                        className="button-primary spaces height-100 flex flex-middle"
                                        onClick={() => setOpenSearchAdvance((prev) => !prev)}
                                    >
                                        {openSearchAdvance ? (
                                            <KTSVG
                                                path="/media/svg/icons/chevron-up.svg"
                                                svgClassName="spaces h-14 w-14 color-white"
                                            />
                                        ) : (
                                            <KTSVG
                                                path="/media/svg/icons/chevron-down.svg"
                                                svgClassName="spaces h-14 w-14 color-white"
                                            />
                                        )}
                                        Nâng cao
                                    </Button>
                                    <Button
                                        className="button-primary spaces height-100 flex flex-middle"
                                        onClick={handleResetForm}
                                    >
                                        <KTSVG
                                            path="/media/svg/icons/recycle.svg"
                                            svgClassName="spaces h-14 w-14 color-white"
                                        />
                                        Chọn lại
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            )}

            <div className="spaces mt-14 form-search">
                <Row>
                    <Col
                        xs={12}
                        sm={6}
                        md={location.pathname === "/danh-sach-truong-hop-benh" ? 4 : 4}
                        xl={location.pathname === "/danh-sach-truong-hop-benh" ? 4 : 2}
                    >
                        <LabelRequired
                            label="Họ tên"
                            className="spaces fw-500"
                        />
                        <OCTTextValidator
                            name="hoTen"
                            type="text"
                            onChange={handleChange}
                            value={values.hoTen || ""}
                            errors={errors?.hoTen}
                            touched={touched?.hoTen}
                            placeholder="Họ tên"
                        />
                    </Col>
                    <Col 
                        xs={12} 
                        sm={6} 
                        md={location.pathname === "/danh-sach-truong-hop-benh" ? 6 : 2} 
                        lg={4}
                        xl={location.pathname === "/danh-sach-truong-hop-benh" ? 4 : 2}
                    >
                        <LabelRequired
                            label="Giới tính"
                            className="spaces fw-500"
                        />
                        <OCTAutocomplete
                            menuPlacement="bottom"
                            onChange={(selectedOption) => {
                                setFieldValue("gioiTinh", selectedOption?.code)
                            }}
                            className="spaces h-30"
                            name="gioiTinh"
                            options={GENDER_OPTION}
                            valueSearch={"code"}
                            value={values?.gioiTinh || null}
                        />
                    </Col>
                    <Col 
                        xs={12} 
                        sm={6} 
                        md={location.pathname === "/danh-sach-truong-hop-benh" ? 6 : 4} 
                        lg={4} 
                        xl={location.pathname === "/danh-sach-truong-hop-benh" ? 4 : 2}
                    >
                        <LabelRequired
                            label="Nghề nghiệp"
                            className="spaces fw-500"
                        />
                        <OCTAutocomplete
                            menuPlacement="bottom"
                            onChange={(selectedOption) =>
                                setFieldValue("ngheNghiep", selectedOption)
                            }
                            className="spaces h-30"
                            name="ngheNghiep"
                            options={[]}
                            value={values?.ngheNghiep || null}
                            getOptionLabel={(option) => option?.tenNghe}
                            searchObject={{}}
                            searchFunction={getListNgheNghiep}
                            urlData="data.data"
                        />
                    </Col>
                    <Col 
                        xs={12} 
                        sm={6} 
                        md={location.pathname === "/danh-sach-truong-hop-benh" ? 4 : 4} 
                        lg={location.pathname === "/danh-sach-truong-hop-benh" ? 4: 4} 
                        xl={location.pathname === "/danh-sach-truong-hop-benh" ? 4 : 2}
                    >
                        <LabelRequired
                            label="Phân loại quản lý"
                            className="spaces fw-500"
                        />
                        <OCTAutocomplete
                            menuPlacement="bottom"
                            onChange={(selectedOption) =>
                                setFieldValue("phanLoaiQuanLy", selectedOption)
                            }
                            className="spaces h-30"
                            name="phanLoaiQuanLy"
                            options={PHAN_LOAI_QUAN_LY}
                            value={values?.phanLoaiQuanLy}
                        />
                    </Col>
                    <Col 
                        xs={12} 
                        sm={6} 
                        md={location.pathname === "/danh-sach-truong-hop-benh" ? 8 : 4} 
                        lg={location.pathname === "/danh-sach-truong-hop-benh" ? 8 : 4} 
                        xl={location.pathname === "/danh-sach-truong-hop-benh" ? 8 : 4}
                    >
                        <LabelRequired
                            label="Tình trạng hiện nay"
                            className="spaces fw-500"
                        />
                        <OCTAutocomplete
                            isMulti
                            getOptionLabel={(option) => option?.name}
                            getOptionValue={option => option?.code}
                            menuPlacement="bottom"
                            onChange={(selectedOption) =>
                                setFieldValue("listTinhTrangHienNay", selectedOption)
                            }
                            className="spaces h-30"
                            name="listTinhTrangHienNay"
                            options={TINH_TRANG_HIEN_NAY}
                            value={values?.listTinhTrangHienNay}
                        />
                    </Col>
                </Row>
                <div className="location">
                    <div className="spaces fs-16 fw-600 my-14">
                        Nơi ở hiện nay của bệnh nhân/ Địa chỉ cơ sở báo cáo
                    </div>
                    <Row>
                        <Col xs={12} sm={6} md={4} lg={4} xl={location.pathname === "/danh-sach-truong-hop-benh" ? 4 : 2}>
                            <LabelRequired
                                label="Tỉnh/Thành phố"
                                className="spaces fw-500"
                            />
                            <OCTAutocomplete
                                menuPlacement="bottom"
                                maxMenuHeight={200}
                                onChange={(selectedOption) =>
                                    setValues({
                                        ...values,
                                        tinh: selectedOption,
                                        huyen: null,
                                        xa: null,
                                    })
                                }
                                className="spaces h-30"
                                name="tinh"
                                options={[]}
                                value={values.tinh}
                                isDisabled={
                                    !!userData?.tinhId
                                }
                                getOptionLabel={(option) => option?.tenTinh}
                                searchObject={{}}
                                searchFunction={getListTinh}
                                urlData='data.data'
                            />
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={4} xl={location.pathname === "/danh-sach-truong-hop-benh" ? 4 : 2}>
                            <LabelRequired
                                label="Huyện/Quận"
                                className="spaces fw-500"
                            />
                            <OCTAutocomplete
                                menuPlacement="bottom"
                                maxMenuHeight={200}
                                onChange={(selectedOption) =>
                                    setValues({
                                        ...values,
                                        huyen: selectedOption,
                                        xa: null,
                                    })
                                }
                                className="spaces h-30"
                                name="huyen"
                                options={[]}
                                value={values?.huyen}
                                isDisabled={
                                    !!userData?.huyenId || !Boolean(values?.tinh)
                                }
                                getOptionLabel={(option) => option.tenHuyen}
                                searchObject={{}}
                                searchFunction={() =>  
                                    values?.tinh?.id && 
                                    getListHuyenByTinhId(values?.tinh?.id)
                                }
                                dependencies={[values?.tinh]}
                                urlData='data.data'
                            />
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={4} xl={location.pathname === "/danh-sach-truong-hop-benh" ? 4 : 2}>
                            <LabelRequired
                                label="Xã/Phường"
                                className="spaces fw-500"
                            />
                            <OCTAutocomplete
                                menuPlacement="bottom"
                                maxMenuHeight={200}
                                onChange={(selectedOption) =>
                                    setFieldValue('xa',selectedOption)
                                }
                                className="spaces h-30"
                                name="xa"
                                options={[]}
                                value={values?.xa}
                                isDisabled={
                                    !!userData?.xaId || !Boolean(values?.huyen)
                                }
                                getOptionLabel={(option) => option.tenXa}
                                searchObject={{}}
                                searchFunction={() =>  
                                    values?.huyen?.id  &&
                                    getListXaByHuyenId(values?.huyen?.id)
                                }
                                dependencies={[values?.huyen]}
                                urlData='data.data'
                            />
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={4} xl={location.pathname === "/danh-sach-truong-hop-benh" ? 4 : 2}>
                            <LabelRequired
                                label="Ngày nhập báo cáo từ"
                                className="spaces fw-500"
                            />
                            <OCTTextValidator
                                name="tuNgayNhapBaoCao"
                                type="date"
                                onChange={handleChange}
                                value={values.tuNgayNhapBaoCao || ""}
                                errors={errors?.tuNgayNhapBaoCao}
                                touched={touched?.tuNgayNhapBaoCao}
                            />
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={4} xl={location.pathname === "/danh-sach-truong-hop-benh" ? 4 : 2}>
                            <LabelRequired
                                label="Ngày nhập báo cáo đến"
                                className="fw-500"
                            />
                            <OCTTextValidator
                                name="denNgayNhapBaoCao"
                                type="date"
                                onChange={handleChange}
                                value={values.denNgayNhapBaoCao || ""}
                                errors={errors?.denNgayNhapBaoCao}
                                touched={touched?.denNgayNhapBaoCao}
                            />
                        </Col>
                        <Col
                            xs={12}
                            sm={6}
                            md={location.pathname === "/danh-sach-truong-hop-benh" ? 6 : 4}
                            lg={4}
                            xl={location.pathname === "/danh-sach-truong-hop-benh" ? 4 : 2}
                        >
                            <AsyncAutoComplete
                                menuPlacement="top"
                                params={{}}
                                label="Cơ sở báo cáo"
                                displayField='tenCoSo'
                                placeholder="Cơ sở báo cáo"
                                service={getListCoSoBaoCao}
                                handleChange={(value) => setFieldValue("coSoGhiNhan", value)}
                                value={values?.coSoGhiNhan || ""}
                            />
                        </Col>
                    </Row>
                </div>
                {(openSearchAdvance || location.pathname === "/danh-sach-truong-hop-benh") && (
                    <div className="searchAdvance">
                        <div className="spaces mt-14">
                            <Row>
                                <Col xs={12} sm={6} md={4} lg={2}>
                                    <LabelRequired
                                        label="Ngày khởi phát từ"
                                        className="fw-500"
                                    />
                                    <OCTTextValidator
                                        name="tuNgayKhoiPhat"
                                        type="date"
                                        onChange={handleChange}
                                        value={values.tuNgayKhoiPhat || ""}
                                        errors={errors?.tuNgayKhoiPhat}
                                        touched={touched?.tuNgayKhoiPhat}
                                    />
                                </Col>
                                <Col xs={12} sm={6} md={4} lg={2}>
                                    <LabelRequired
                                        label="Ngày khởi phát đến"
                                        className="fw-500"
                                    />
                                    <OCTTextValidator
                                        name="denNgayKhoiPhat"
                                        type="date"
                                        onChange={handleChange}
                                        value={values.denNgayKhoiPhat || ""}
                                        errors={errors?.denNgayKhoiPhat}
                                        touched={touched?.denNgayKhoiPhat}
                                    />
                                </Col>
                                <Col xs={12} sm={6} md={4} lg={2}>
                                    <LabelRequired
                                        label="Ngày nhập viện từ"
                                        className="fw-500"
                                    />
                                    <OCTTextValidator
                                        name="tuNgayNhapVien"
                                        type="date"
                                        onChange={handleChange}
                                        value={values.tuNgayNhapVien || ""}
                                        errors={errors?.tuNgayNhapVien}
                                        touched={touched?.tuNgayNhapVien}
                                    />
                                </Col>
                                <Col xs={12} sm={6} md={4} lg={2}>
                                    <LabelRequired
                                        label="Ngày nhập viện đến"
                                        className="fw-500"
                                    />
                                    <OCTTextValidator
                                        name="denNgayNhapVien"
                                        type="date"
                                        onChange={handleChange}
                                        value={values.denNgayNhapVien || ""}
                                        errors={errors?.denNgayNhapVien}
                                        touched={touched?.denNgayNhapVien}
                                    />
                                </Col>
                                <Col xs={12} sm={6} md={4} lg={2}>
                                    <LabelRequired
                                        label="Ngày ra viện/tử vong từ"
                                        className="fw-500"
                                    />
                                    <OCTTextValidator
                                        name="tuNgayRaVien"
                                        type="date"
                                        onChange={handleChange}
                                        value={values.tuNgayRaVien || ""}
                                        errors={errors?.tuNgayRaVien}
                                        touched={touched?.tuNgayRaVien}
                                    />
                                </Col>
                                <Col xs={12} sm={6} md={4} lg={2}>
                                    <LabelRequired
                                        label="Ngày ra viện/tử vong đến"
                                        className="fw-500"
                                    />
                                    <OCTTextValidator
                                        name="denNgayRaVien"
                                        type="date"
                                        onChange={handleChange}
                                        value={values.denNgayRaVien || ""}
                                        errors={errors?.denNgayRaVien}
                                        touched={touched?.denNgayRaVien}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <div className="spaces mt-14">
                            <Row>
                                <Col xs={12} sm={6} md={4} lg={2}>
                                    <LabelRequired
                                        label="Ngày lấy mẫu xét nghiệm từ"
                                        className="fw-500"
                                    />
                                    <OCTTextValidator
                                        name="tuNgayLayMau"
                                        type="date"
                                        onChange={handleChange}
                                        value={values.tuNgayLayMau || ""}
                                        errors={errors?.tuNgayLayMau}
                                        touched={touched?.tuNgayLayMau}
                                    />
                                </Col>
                                <Col xs={12} sm={6} md={4} lg={2}>
                                    <LabelRequired
                                        label="Ngày lấy mẫu xét nghiệm đến"
                                        className="fw-500"
                                    />
                                    <OCTTextValidator
                                        name="denNgayLayMau"
                                        type="date"
                                        onChange={handleChange}
                                        value={values.denNgayLayMau || ""}
                                        errors={errors?.denNgayLayMau}
                                        touched={touched?.denNgayLayMau}
                                    />
                                </Col>
                                <Col xs={12} sm={6} md={4} lg={2}>
                                    <LabelRequired
                                        label="Ngày trả kết quả từ"
                                        className="fw-500"
                                    />
                                    <OCTTextValidator
                                        name="tuNgayTraKetQuaXn"
                                        type="date"
                                        onChange={handleChange}
                                        value={values.tuNgayTraKetQuaXn || ""}
                                        errors={errors?.tuNgayTraKetQuaXn}
                                        touched={touched?.tuNgayTraKetQuaXn}
                                    />
                                </Col>
                                <Col xs={12} sm={6} md={4} lg={2}>
                                    <LabelRequired
                                        label="Ngày trả kết quả đến"
                                        className="fw-500"
                                    />
                                    <OCTTextValidator
                                        name="denNgayTraKetQuaXn"
                                        type="date"
                                        onChange={handleChange}
                                        value={values.denNgayTraKetQuaXn || ""}
                                        errors={errors?.denNgayTraKetQuaXn}
                                        touched={touched?.denNgayTraKetQuaXn}
                                    />
                                </Col>
                                <Col xs={12} sm={6} md={4} lg={location.pathname === "/danh-sach-truong-hop-benh" ? 4 : 2}>
                                    <LabelRequired
                                        label="Kết quả xét nghiệm"
                                        className="spaces fw-500"
                                    />
                                    <OCTAutocomplete
                                        onChange={(selectedOption) =>
                                            setFieldValue("kqXetNghiem", selectedOption?.code)
                                        }
                                        className="spaces h-30"
                                        name="kqXetNghiem"
                                        options={KQ_XET_NGHIEM}
                                        value={values?.kqXetNghiem}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <div className="spaces mt-14">
                            <Row>
                                <Col xs={12} sm={6} md={location.pathname === "/danh-sach-truong-hop-benh" ? 6 : 4} lg={4}>
                                    <AsyncAutoComplete
                                        menuPlacement="top"
                                        params={{}}
                                        label="Đơn vị xét nghiệm"
                                        displayField='tenCoSo'
                                        service={getListCoSoXetNghiem}
                                        handleChange={(value) => setFieldValue("donViThucHienXn", value)}
                                        value={values?.donViThucHienXn || ""}
                                    />
                                </Col>
                                <Col xs={12} sm={6} md={location.pathname === "/danh-sach-truong-hop-benh" ? 6 : 4} lg={4}>
                                    <AsyncAutoComplete
                                        menuPlacement="top"
                                        params={{}}
                                        label="Cơ sở điều trị"
                                        displayField='tenCoSo'
                                        service={getListCoSoDieuTri}
                                        handleChange={(value) => setFieldValue("coSoDieuTri", value)}
                                        value={values?.coSoDieuTri || ""}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default SearchAdvanceForm