import { useFormikContext } from "formik";
import LabelRequired from "../../component/LabelRequired";
import { Button, Col, Row } from "react-bootstrap";
import { OCTAutocomplete, OCTKTSVG, OCTTextValidator } from "@oceantech/oceantech-ui";
import { useEffect, useState } from "react";
import { getListBenhChanDoan, getListCoSoBaoCao, getListHuyenByTinhId, getListTinh, getListXaByHuyenId} from "../../services";
import { TRANG_THAI_O_DICH } from "../constants/constants";
import { ISearchObjModel } from "../models/quanLyODichModels";
import AsyncAutoComplete from "../../component/input-field/AsyncAutoComplete";
import { localStorageItem } from "../../utils/LocalStorage";
import { KEY_LOCALSTORAGE } from "../../auth/core/_consts";
import { authRoles } from "../../auth/authRoles";
import TextValidator from "../../component/input-field/text-validator";

export const FilterSearchBox = () => {
    const [shouldOpenAdvanceSearch, setShouldOpenAdvanceSearch] = useState<boolean>(false);
    const { values, handleChange, errors, touched, setFieldValue, setValues } = useFormikContext<ISearchObjModel>();
    const userData = localStorageItem.get(KEY_LOCALSTORAGE.USER_INFOMATION);
    
    useEffect(()=>{
        setValues({
          ...values,
          tinh:  userData?.tinhInfo,
          huyen: userData?.huyenInfo,
          xa: userData?.xaInfo,
        })
    }, [])
          
    return (
        <div>
            <Row className="border-bottom spaces pb-15">
                <Col xs={12} lg={9}>
                    <OCTTextValidator
                        className="d-flex"
                        placeholder="Nhập tên ổ dịch muốn tìm"
                        name="keyword"
                        type="text"
                        value={values?.keyword}
                        onChange={handleChange}
                    />
                </Col>
                <Col xs={12} lg={3} >
                    <div className="d-flex align-items-center spaces gap-10 search-action">
                        <Button
                            className="button-primary"
                            type="submit"
                        >
                            <OCTKTSVG
                                path="/media/svg/icons/search.svg"
                                svgClassName="spaces h-14 w-14 color-white"
                            />
                            Tìm kiếm
                        </Button>
                        <Button
                            className="button-primary"
                            type="button"
                            onClick={() => setShouldOpenAdvanceSearch((prev) => !prev)}
                        >
                            <span className="spaces mr-5">Nâng cao</span>
                            {shouldOpenAdvanceSearch ? (
                                <OCTKTSVG
                                    path="/media/svg/icons/chevron-up.svg"
                                    svgClassName="spaces h-12 w-12 color-white"
                                />
                            ) : (
                                <OCTKTSVG
                                    path="/media/svg/icons/chevron-down.svg"
                                    svgClassName="spaces h-12 w-12 color-white"
                                />
                            )}
                        </Button>
                    </div>
                </Col>
            </Row>
            {shouldOpenAdvanceSearch && (
                <>
                    <Row className="spaces mt-5">
                        <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                            <LabelRequired
                                label="Tỉnh/TP"
                                className="spaces fw-500 mb-5"
                            />
                            <OCTAutocomplete
                                className="spaces h-25"
                                urlData="data.data"
                                name="tinh"
                                options={[]}
                                searchFunction={getListTinh}
                                getOptionLabel={(option) => option?.tenTinh}
                                value={values.tinh}
                                isDisabled={
                                    userData?.username === authRoles.TINH ||
                                    userData?.username === authRoles.HUYEN ||
                                    userData?.username === authRoles.XA
                                }
                                searchObject={{}}
                                onChange={(selectedOption) =>
                                    setValues({
                                        ...values,
                                        tinh: selectedOption,
                                        huyen: null,
                                        xa: null,
                                    })
                                }
                            />
                        </Col>
                        <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                            <LabelRequired
                                label="Quận/Huyện"
                                className="spaces fw-500 mb-5"
                            />
                            <OCTAutocomplete
                                className="spaces h-25"
                                urlData="data.data"
                                name="huyen"
                                options={[]}
                                searchFunction={() => values?.tinh?.id && getListHuyenByTinhId(values?.tinh?.id)}
                                getOptionLabel={(option) => option?.tenHuyen}
                                value={values.huyen}
                                isDisabled={
                                    userData?.username === authRoles.HUYEN ||
                                    userData?.username === authRoles.XA ||
                                    !values?.tinh?.id
                                }
                                searchObject={{}}
                                onChange={(selectedOption) =>
                                    setValues({
                                        ...values,
                                        huyen: selectedOption,
                                        xa: null,
                                    })
                                }
                            />
                        </Col>
                        <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                            <LabelRequired
                                label="Phường/Xã"
                                className="spaces fw-500 mb-5"
                            />
                            <OCTAutocomplete
                                className="spaces h-25"
                                urlData="data.data"
                                name="xa"
                                options={[]}
                                searchFunction={() => values?.huyen?.id && getListXaByHuyenId(values?.huyen?.id)}
                                getOptionLabel={(option) => option?.tenXa}
                                value={values.xa}
                                isDisabled={
                                    userData?.username === authRoles.XA ||
                                    !values?.huyen?.id
                                }
                                searchObject={{}}
                                onChange={(value) => setFieldValue("xa", value)}
                                dependencies={[values?.huyen]}
                            />
                        </Col>
                        <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                            <LabelRequired
                                label="Bệnh"
                                className="spaces fw-500 mb-5"
                            />
                            <OCTAutocomplete
                                menuPlacement="bottom"
                                isMulti
                                getOptionValue={option => option.benhChanDoanId}
                                onChange={(selectedOption) =>
                                    setFieldValue("listBenhTruyenNhiemId", selectedOption)
                                }
                                className="spaces h-30"
                                name="listBenhTruyenNhiemId"
                                options={[]}
                                value={values?.listBenhTruyenNhiemId}
                                getOptionLabel={(option) => option?.tenBenhChanDoan}
                                searchObject={{}}
                                searchFunction={getListBenhChanDoan}
                                urlData="data.data"
                            />
                        </Col>
                    </Row>
                    <Row className="spaces mt-15">
                        <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                            <LabelRequired
                                label="Ngày khởi phát từ ngày"
                                className="spaces fw-500 mb-5"
                            />
                            <TextValidator
                                className="spaces flex-1"
                                name="ngayKhoiPhatTuNgay"
                                type="date"
                                value={values?.ngayKhoiPhatTuNgay}
                                onChange={handleChange}
                                errors={errors?.ngayKhoiPhatTuNgay}
                                touched={touched?.ngayKhoiPhatTuNgay}
                            />
                        </Col>
                        <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                            <LabelRequired
                                label="Ngày khởi phát đến ngày"
                                className="spaces fw-500 mb-5"
                            />
                            <TextValidator
                                className="spaces flex-1"
                                name="ngayKhoiPhatDenNgay"
                                type="date"
                                value={values?.ngayKhoiPhatDenNgay}
                                onChange={handleChange}
                                errors={errors?.ngayKhoiPhatDenNgay}
                                touched={touched?.ngayKhoiPhatDenNgay}
                            />
                        </Col>
                        <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                            <LabelRequired
                                label="Ngày tạo báo cáo từ ngày"
                                className="spaces fw-500 mb-5"
                            />
                            <TextValidator
                                className="spaces flex-1"
                                name="ngayBaoCaoTuNgay"
                                type="date"
                                value={values?.ngayBaoCaoTuNgay}
                                onChange={handleChange}
                                errors={errors?.ngayBaoCaoTuNgay}
                                touched={touched?.ngayBaoCaoTuNgay}
                            />
                        </Col>
                        <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                            <LabelRequired
                                label="Ngày tạo báo cáo đến ngày"
                                className="spaces fw-500 mb-5"
                            />
                            <TextValidator
                                className="spaces flex-1"
                                name="ngayBaoCaoDenNgay"
                                type="date"
                                value={values?.ngayBaoCaoDenNgay}
                                onChange={handleChange}
                                errors={errors?.ngayBaoCaoDenNgay}
                                touched={touched?.ngayBaoCaoDenNgay}
                            />
                        </Col>
                    </Row>
                    <Row className="spaces mt-15">
                        <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                            <LabelRequired
                                label="Ngày kết thúc từ ngày"
                                className="spaces fw-500 mb-5"
                            />
                            <TextValidator
                                className="spaces flex-1"
                                name="ngayKetThucTuNgay"
                                type="date"
                                value={values?.ngayKetThucTuNgay}
                                onChange={handleChange}
                                errors={errors?.ngayKetThucTuNgay}
                                touched={touched?.ngayKetThucTuNgay}
                            />
                        </Col>
                        <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                            <LabelRequired
                                label="Ngày kết thúc đến ngày"
                                className="spaces fw-500 mb-5"
                            />
                            <TextValidator
                                className="spaces flex-1"
                                name="ngayKetThucDenNgay"
                                type="date"
                                value={values?.ngayKetThucDenNgay}
                                onChange={handleChange}
                                errors={errors?.ngayKetThucDenNgay}
                                touched={touched?.ngayKetThucDenNgay}
                            />
                        </Col>
                        <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                            <LabelRequired
                                label="Trạng thái"
                                className="spaces fw-500 mb-5"
                            />
                            <OCTAutocomplete
                                className="spaces h-25"
                                urlData="data.data"
                                name="trangThaiId"
                                options={TRANG_THAI_O_DICH}
                                getOptionLabel={(option) => option?.value}
                                onChange={(option) => setFieldValue("trangThaiId", option?.code)}
                            />
                        </Col>
                        <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-10">
                            <AsyncAutoComplete
                                menuPlacement="top"
                                params={{}}
                                label="Cơ sở báo cáo"
                                displayField='tenCoSo'
                                service={getListCoSoBaoCao}
                                handleChange={(value) => setFieldValue("donViBaoCao", value)}
                                value={values?.donViBaoCao}
                            />
                        </Col>
                    </Row>
                </>
            )}
        </div>
    )
}

export default FilterSearchBox