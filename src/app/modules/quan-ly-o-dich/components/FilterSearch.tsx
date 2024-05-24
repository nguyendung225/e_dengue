import { Formik } from "formik";
import LabelRequired from "../../component/LabelRequired";
import { Button, Col, Row } from "react-bootstrap";
import { OCTAutocomplete, OCTKTSVG, OCTTextValidator } from "@oceantech/oceantech-ui";
import { useState } from "react";

export const FilterSearchBox = () => {
    const [shouldOpenAdvanceSearch, setShouldOpenAdvanceSearch] = useState<boolean>(false);

    const handleSearch = () => {

    }

    return (
        <>
            <Formik
                initialValues={{}}
                onSubmit={handleSearch}
            >
                {({
                    errors,
                    values,
                    touched,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                }) => {

                    return (
                        <form onSubmit={handleSearch}>
                            <div className="">
                                <Row className="border-bottom spaces pb-15">
                                    <Col xs={6} sm={6} md={6} lg={6}>
                                        <OCTTextValidator
                                            className="d-flex"
                                            placeholder="Nhập tên ổ dịch muốn tìm"
                                            name="denNgay"
                                            type="text"
                                        //    value={values?.denNgay || ""}
                                        //    onChange={(e: any) => handleChange("denNgay", e.target.value)}
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
                                                    name="trangThai"
                                                    options={[]}
                                                />
                                            </Col>
                                            <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                                                <LabelRequired
                                                    label="Quận/Huyện"
                                                    className="spaces fw-500 mb-5"
                                                />
                                                <OCTAutocomplete
                                                    className="spaces h-25 min-w-256"
                                                    name="trangThai"
                                                    options={[]}
                                                />
                                            </Col>
                                            <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                                                <LabelRequired
                                                    label="Phường/Xã"
                                                    className="spaces fw-500 mb-5"
                                                />
                                                <OCTAutocomplete
                                                    className="spaces h-25 min-w-256"
                                                    name="trangThai"
                                                    options={[]}
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
                                                />
                                            </Col>
                                            <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                                                <LabelRequired
                                                    label="Trạng thái"
                                                    className="spaces fw-500 mb-5"
                                                />
                                                <OCTAutocomplete
                                                    className="spaces h-25 min-w-256"
                                                    name="trangThai"
                                                    options={[]}
                                                />
                                            </Col>
                                            <Col xs={12} sm={6} md={3} lg={3} className="spaces mt-5">
                                                <LabelRequired
                                                    label="Đơn vị báo cáo"
                                                    className="spaces fw-500 mb-5"
                                                />
                                                <OCTAutocomplete
                                                    className="spaces h-25 min-w-256"
                                                    name="trangThai"
                                                    options={[]}
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