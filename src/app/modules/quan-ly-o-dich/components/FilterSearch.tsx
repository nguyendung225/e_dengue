import * as Yup from "yup";
import { Formik } from "formik";
import LabelRequired from "../../component/LabelRequired";
import { Button, Col, Row } from "react-bootstrap";
import { OCTAutocomplete, OCTKTSVG, OCTTextValidator } from "@oceantech/oceantech-ui";
import { Dispatch, SetStateAction, useState } from "react";
import { getListHuyen, getListTinh, getListXa } from "../../services";
import { initSearchObj } from "../constants/constants";
import { ISearchObjModel } from "../models/quanLyODichModels";

type TProps = {
    setODichList: Dispatch<SetStateAction<never[]>>;
}

export const FilterSearchBox = ({ setODichList }: TProps) => {
    const [shouldOpenAdvanceSearch, setShouldOpenAdvanceSearch] = useState<boolean>(false);

    const validationSchema = Yup.object().shape({
        ngayKhoiPhatTuNgay: Yup.date()
            .max(new Date(), "Không được lớn hơn ngày hiện tại"),
        ngayKhoiPhatDenNgay: Yup.date()
            .min(Yup.ref("ngayKhoiPhatTuNgay"), "Ngày khởi phát đến phải lớn hơn ngày bắt đầu")
            .max(new Date(), "Không được lớn hơn ngày hiện tại"),
        ngayTaoBaoCaoTuNgay: Yup.date()
            .max(new Date(), "Không được lớn hơn ngày hiện tại"),
        ngayTaoBaoCaoDenNgay: Yup.date()
            .min(Yup.ref("ngayTaoBaoCaoTuNgay"), "Ngày khởi phát đến phải lớn hơn ngày bắt đầu")
            .max(new Date(), "Không được lớn hơn ngày hiện tại"),
        ngayKetThucTuNgay: Yup.date()
            .max(new Date(), "Không được lớn hơn ngày hiện tại"),
        ngayKetThucDenNgay: Yup.date()
            .min(Yup.ref("ngayKetThucTuNgay"), "Ngày khởi phát đến phải lớn hơn ngày bắt đầu")
            .max(new Date(), "Không được lớn hơn ngày hiện tại"),
    });

    const handleSearch = (values: ISearchObjModel) => {
        // Xử lý call api tìm kiếm
    }

    return (
        <>
            <Formik
                validationSchema={validationSchema}
                initialValues={initSearchObj}
                onSubmit={handleSearch}
            >
                {({
                    errors,
                    values,
                    touched,
                    handleSubmit,
                    handleChange,
                    setFieldValue,
                }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Row className="border-bottom spaces pb-15">
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                        <OCTTextValidator
                                            className="d-flex"
                                            placeholder="Nhập tên ổ dịch muốn tìm"
                                            name="keyword"
                                            type="text"
                                            value={values?.keyword}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                    <Col xs={6} sm={6} md={3} lg={3}>
                                        <div className="d-flex align-items-center spaces gap-10">
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
                                                    className="spaces h-25 min-w-256"
                                                    urlData="data.data"
                                                    name="tinhId"
                                                    options={[]}
                                                    searchFunction={getListTinh}
                                                    getOptionLabel={(option) => option.tenTinh}
                                                    searchObject={{}}
                                                    onChange={(value) => setFieldValue("tinhId", value?.id)}
                                                />
                                            </Col>
                                            <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                                                <LabelRequired
                                                    label="Quận/Huyện"
                                                    className="spaces fw-500 mb-5"
                                                />
                                                <OCTAutocomplete
                                                    className="spaces h-25 min-w-256"
                                                    urlData="data.data"
                                                    name="huyenId"
                                                    options={[]}
                                                    searchFunction={getListHuyen}
                                                    getOptionLabel={(option) => option.tenHuyen}
                                                    searchObject={{}}
                                                    onChange={(value) => setFieldValue("huyenId", value?.id)}
                                                />
                                            </Col>
                                            <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                                                <LabelRequired
                                                    label="Phường/Xã"
                                                    className="spaces fw-500 mb-5"
                                                />
                                                <OCTAutocomplete
                                                    className="spaces h-25 min-w-256"
                                                    urlData="data.data"
                                                    name="xaId"
                                                    options={[]}
                                                    searchFunction={getListXa}
                                                    getOptionLabel={(option) => option.tenXa}
                                                    searchObject={{}}
                                                    onChange={(value) => setFieldValue("xaId", value?.id)}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="spaces mt-15">
                                            <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                                                <LabelRequired
                                                    label="Ngày khởi phát từ ngày"
                                                    className="spaces fw-500 mb-5"
                                                />
                                                <OCTTextValidator
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
                                                <OCTTextValidator
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
                                                <OCTTextValidator
                                                    className="spaces flex-1"
                                                    name="ngayTaoBaoCaoTuNgay"
                                                    type="date"
                                                    value={values?.ngayTaoBaoCaoTuNgay}
                                                    onChange={handleChange}
                                                    errors={errors?.ngayTaoBaoCaoTuNgay}
                                                    touched={touched?.ngayTaoBaoCaoTuNgay}
                                                />
                                            </Col>
                                            <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                                                <LabelRequired
                                                    label="Ngày tạo báo cáo đến ngày"
                                                    className="spaces fw-500 mb-5"
                                                />
                                                <OCTTextValidator
                                                    className="spaces flex-1"
                                                    name="ngayTaoBaoCaoDenNgay"
                                                    type="date"
                                                    value={values?.ngayTaoBaoCaoDenNgay}
                                                    onChange={handleChange}
                                                    errors={errors?.ngayTaoBaoCaoDenNgay}
                                                    touched={touched?.ngayTaoBaoCaoDenNgay}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="spaces mt-15">
                                            <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                                                <LabelRequired
                                                    label="Ngày kết thúc từ ngày"
                                                    className="spaces fw-500 mb-5"
                                                />
                                                <OCTTextValidator
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
                                                <OCTTextValidator
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
                                                    className="spaces h-25 min-w-256"
                                                    urlData="data.data"
                                                    name="trangThaiId"
                                                    options={[]}
                                                    // searchFunction={getListDmTinhTrangHienTai}
                                                    // getOptionLabel={(option) => option.tenTrangThai}
                                                    searchObject={{}}
                                                    onChange={(value) => setFieldValue("trangThaiId", value?.id)}
                                                />
                                            </Col>
                                            <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                                                <LabelRequired
                                                    label="Đơn vị báo cáo"
                                                    className="spaces fw-500 mb-5"
                                                />
                                                <OCTAutocomplete
                                                    className="spaces h-25 min-w-256"
                                                    urlData="data.data"
                                                    name="donViBaoCaoId"
                                                    options={[]}
                                                    // searchFunction={getListDmDonViThucHienXetNghiem}
                                                    // getOptionLabel={(option) => option.tenDonViBaoCao}
                                                    searchObject={{}}
                                                    onChange={(value) => setFieldValue("donViBaoCaoId", value?.id)}
                                                />
                                            </Col>
                                        </Row>
                                    </>
                                )}
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </>
    )
}

export default FilterSearchBox