import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { KTSVG } from "../../../../../_metronic/helpers";
import LabelRequired from "../../../component/LabelRequired";
import { Formik } from "formik";
import Autocomplete from "../../../component/input-field/Autocomplete";
import { GENDER_OPTION, SEARCH_OBJECT_INIT } from "../../const/constants";
import { OCTTextValidator } from "@oceantech/oceantech-ui";

type Props = {};

const FilterSearchContainer = ({}: Props) => {
  const [openSearchAdvance, setOpenSearchAdvance] = useState<boolean>(false);

  const handleSubmit = (values: any) => {};

  return (
    <>
        <Formik initialValues={SEARCH_OBJECT_INIT} onSubmit={handleSubmit}>
          {({ values, errors, touched, handleSubmit, setFieldValue }) => {
            const handleChange = (name: string, value: any) => {
              setFieldValue(name, value);
            };
            return (
              <form onSubmit={handleSubmit}>
                <div className="spaces mt-14 rounded">
                  <div className="spaces my-10 fw-700 fs-16 color-dark-red text-uppercase">
                    Tìm kiếm trường hợp bệnh
                  </div>
                  <div>
                    <Row>
                      <Col xs={12}  lg={9}>
                        <div className="flex flex-middle">
                          <OCTTextValidator
                            placeholder="Tìm kiếm theo họ tên/ mã số bệnh nhân/ CMND/ Số điện thoại"
                            onChange={(e: any) =>
                              handleChange("keyword", e.target.value)
                            }
                            className="spaces width-100"
                            value={values?.keyword}
                          />
                        </div>
                      </Col>
                      <Col xs={12} lg={3}>
                        <div className="flex flex-middle flex-wrap gap-2 search-action">
                          <Button className="button-primary spaces height-100 flex flex-middle">
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
                          <Button className="button-primary spaces height-100 flex flex-middle">
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

                <div className="spaces mt-14 form-search">
                  <Row>
                    <Col xs={12} sm={6} md={4} xl={2}>
                      <LabelRequired label="Họ tên" className="spaces fw-500" />
                      <OCTTextValidator name="name" type="text" />
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={2}>
                      <LabelRequired
                        label="Giới tính"
                        className="spaces fw-500"
                      />
                      <Autocomplete
                        onChange={(selectedOption) =>
                          handleChange("gioiTinh", selectedOption?.code)
                        }
                        className="spaces h-30 "
                        name="gioiTinh"
                        options={GENDER_OPTION}
                        value={values?.gioiTinh}
                        errors={errors?.gioiTinh}
                        touched={touched?.gioiTinh}
                      />
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={2}>
                      <LabelRequired
                        label="Nghề nghiệp"
                        className="spaces fw-500"
                      />
                      <Autocomplete
                        onChange={(selectedOption) =>
                          handleChange("gioiTinh", selectedOption?.code)
                        }
                        className="spaces h-30 "
                        name="gioiTinh"
                        options={GENDER_OPTION}
                        value={values?.gioiTinh}
                        errors={errors?.gioiTinh}
                        touched={touched?.gioiTinh}
                      />
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={2}>
                      <LabelRequired
                        label="Phân loại quản lý"
                        className="spaces fw-500"
                      />
                      <Autocomplete
                        onChange={(selectedOption) =>
                          handleChange("gioiTinh", selectedOption?.code)
                        }
                        className="spaces h-30 "
                        name="gioiTinh"
                        options={GENDER_OPTION}
                        value={values?.gioiTinh}
                        errors={errors?.gioiTinh}
                        touched={touched?.gioiTinh}
                      />
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={2}>
                      <LabelRequired
                        label="Chọn bệnh"
                        className="spaces fw-500"
                      />
                      <Autocomplete
                        onChange={(selectedOption) =>
                          handleChange("gioiTinh", selectedOption?.code)
                        }
                        className="spaces h-30 "
                        name="gioiTinh"
                        options={GENDER_OPTION}
                        value={values?.gioiTinh}
                        errors={errors?.gioiTinh}
                        touched={touched?.gioiTinh}
                      />
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={2}>
                      <LabelRequired
                        label="Tình trạng hiện nay"
                        className="spaces fw-500"
                      />
                      <Autocomplete
                        onChange={(selectedOption) =>
                          handleChange("gioiTinh", selectedOption?.code)
                        }
                        className="spaces h-30 "
                        name="gioiTinh"
                        options={GENDER_OPTION}
                        value={values?.gioiTinh}
                        errors={errors?.gioiTinh}
                        touched={touched?.gioiTinh}
                      />
                    </Col>
                  </Row>
                  <div className="location">
                    <div className="spaces fs-16 fw-600 my-14 ">
                      Nơi ở hiện nay của bệnh nhân/ Địa chỉ cơ sở báo cáo
                    </div>
                    <Row>
                      <Col xs={12} sm={6} md={4} lg={2}>
                        <LabelRequired
                          label="Tỉnh/Thành phố"
                          className="spaces fw-500"
                        />
                        <Autocomplete
                          onChange={(selectedOption) =>
                            handleChange("gioiTinh", selectedOption?.code)
                          }
                          className="spaces h-30"
                          name="gioiTinh"
                          options={GENDER_OPTION}
                          value={values?.gioiTinh}
                          errors={errors?.gioiTinh}
                          touched={touched?.gioiTinh}
                        />
                      </Col>
                      <Col xs={12} sm={6} md={4} lg={2}>
                        <LabelRequired
                          label="Huyện/Quận"
                          className="spaces fw-500"
                        />
                        <Autocomplete
                          onChange={(selectedOption) =>
                            handleChange("gioiTinh", selectedOption?.code)
                          }
                          className="spaces h-30 "
                          name="gioiTinh"
                          options={GENDER_OPTION}
                          value={values?.gioiTinh}
                          errors={errors?.gioiTinh}
                          touched={touched?.gioiTinh}
                        />
                      </Col>
                      <Col xs={12} sm={6} md={4} lg={2}>
                        <LabelRequired
                          label="Xã/Phường"
                          className="spaces fw-500"
                        />
                        <Autocomplete
                          onChange={(selectedOption) =>
                            handleChange("gioiTinh", selectedOption?.code)
                          }
                          className="spaces h-30 "
                          name="gioiTinh"
                          options={GENDER_OPTION}
                          value={values?.gioiTinh}
                          errors={errors?.gioiTinh}
                          touched={touched?.gioiTinh}
                        />
                      </Col>
                      <Col xs={12} sm={6} md={4} lg={2}>
                        <LabelRequired
                          label="Ngày nhập báo cáo từ"
                          className="spaces fw-500"
                        />
                        <Autocomplete
                          onChange={(selectedOption) =>
                            setFieldValue("gioiTinh", selectedOption?.gioiTinh)
                          }
                          className="spaces h-30 "
                          name="gioiTinh"
                          options={GENDER_OPTION}
                          value={values?.gioiTinh}
                          errors={errors?.gioiTinh}
                          touched={touched?.gioiTinh}
                        />
                      </Col>
                      <Col xs={12} sm={6} md={4} lg={2}>
                        <LabelRequired
                          label="Ngày nhập báo cáo đến"
                          className="fw-500"
                        />
                        <OCTTextValidator name="name" type="date" />
                      </Col>
                      <Col xs={12} sm={6} md={4} lg={2}>
                        <LabelRequired
                          label="Cơ sở báo cáo"
                          className="spaces fw-500"
                        />
                        <Autocomplete
                          onChange={(selectedOption) =>
                            handleChange("gioiTinh", selectedOption?.code)
                          }
                          className="spaces h-30 "
                          name="gioiTinh"
                          options={GENDER_OPTION}
                          value={values?.gioiTinh}
                          errors={errors?.gioiTinh}
                          touched={touched?.gioiTinh}
                        />
                      </Col>
                    </Row>
                  </div>
                  {openSearchAdvance && (
                    <div className="searchAdvance">
                      <div className="spaces mt-14">
                        <Row>
                          <Col xs={12} sm={6} md={4} lg={2}>
                            <LabelRequired
                              label="Ngày khởi phát từ"
                              className="fw-500"
                            />
                            <OCTTextValidator name="name" type="date" />
                          </Col>
                          <Col xs={12} sm={6} md={4} lg={2}>
                            <LabelRequired
                              label="Ngày khởi phát đến"
                              className="fw-500"
                            />
                            <OCTTextValidator name="name" type="date" />
                          </Col>
                          <Col xs={12} sm={6} md={4} lg={2}>
                            <LabelRequired
                              label="Ngày nhập viện từ"
                              className="fw-500"
                            />
                            <OCTTextValidator name="name" type="date" />
                          </Col>
                          <Col xs={12} sm={6} md={4} lg={2}>
                            <LabelRequired
                              label="Ngày nhập viện đến"
                              className="fw-500"
                            />
                            <OCTTextValidator name="name" type="date" />
                          </Col>
                          <Col xs={12} sm={6} md={4} lg={2}>
                            <LabelRequired
                              label="Ngày ra viện/tử vong từ"
                              className="fw-500"
                            />
                            <OCTTextValidator name="name" type="date" />
                          </Col>
                          <Col xs={12} sm={6} md={4} lg={2}>
                            <LabelRequired
                              label="Ngày ra viện/tử vong đến"
                              className="fw-500"
                            />
                            <OCTTextValidator name="name" type="date" />
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
                            <OCTTextValidator name="name" type="date" />
                          </Col>
                          <Col xs={12} sm={6} md={4} lg={2}>
                            <LabelRequired
                              label="Ngày lấy mẫu xét nghiệm đến"
                              className="fw-500"
                            />
                            <OCTTextValidator name="name" type="date" />
                          </Col>
                          <Col xs={12} sm={6} md={4} lg={2}>
                            <LabelRequired
                              label="Ngày trả kết quả từ"
                              className="fw-500"
                            />
                            <OCTTextValidator name="name" type="date" />
                          </Col>
                          <Col xs={12} sm={6} md={4} lg={2}>
                            <LabelRequired
                              label="Ngày trả kết quả đến"
                              className="fw-500"
                            />
                            <OCTTextValidator name="name" type="date" />
                          </Col>
                          <Col xs={12} sm={6} md={4} lg={2}>
                            <LabelRequired
                              label="Kết quả xét nghiệm"
                              className="spaces fw-500"
                            />
                            <Autocomplete
                              onChange={(selectedOption) =>
                                handleChange("gioiTinh", selectedOption?.code)
                              }
                              className="spaces h-30 "
                              name="gioiTinh"
                              options={GENDER_OPTION}
                              value={values?.gioiTinh}
                              errors={errors?.gioiTinh}
                              touched={touched?.gioiTinh}
                            />
                          </Col>
                        </Row>
                      </div>
                      <div className="spaces mt-14">
                        <Row>
                          <Col xs={12} sm={6} md={4}>
                            <LabelRequired
                              label="Đơn vị xét nghiệm"
                              className="spaces fw-500"
                            />
                            <Autocomplete
                              onChange={(selectedOption) =>
                                handleChange("gioiTinh", selectedOption?.code)
                              }
                              className="spaces h-30 "
                              name="gioiTinh"
                              options={GENDER_OPTION}
                              value={values?.gioiTinh}
                              errors={errors?.gioiTinh}
                              touched={touched?.gioiTinh}
                            />
                          </Col>
                          <Col xs={12} sm={6} md={4}>
                            <LabelRequired
                              label="Cơ sở điều trị"
                              className="spaces fw-500"
                            />
                            <Autocomplete
                              onChange={(selectedOption) =>
                                handleChange("gioiTinh", selectedOption?.code)
                              }
                              className="spaces h-30 "
                              name="gioiTinh"
                              options={GENDER_OPTION}
                              value={values?.gioiTinh}
                              errors={errors?.gioiTinh}
                              touched={touched?.gioiTinh}
                            />
                          </Col>
                        </Row>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            );
          }}
        </Formik>
    </>
  );
};

export default FilterSearchContainer;
