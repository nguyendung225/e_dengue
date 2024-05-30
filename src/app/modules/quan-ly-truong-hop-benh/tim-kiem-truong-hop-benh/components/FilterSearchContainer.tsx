import React, {  useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { KTSVG } from "../../../../../_metronic/helpers";
import LabelRequired from "../../../component/LabelRequired";
import { Formik } from "formik";
import { GENDER_OPTION, KQ_XET_NGHIEM, PHAN_LOAI_QUAN_LY, SEARCH_OBJECT_INIT, TINH_TRANG_HIEN_NAY } from "../constants/constants";
import { OCTAutocomplete, OCTTextValidator } from "@oceantech/oceantech-ui";
import { useLocation } from "react-router-dom";
import { getListBenhChanDoan, getListCoSo, getListDmDonViThucHienXetNghiem, getListHuyen, getListHuyenByTinhId, getListNgheNghiep, getListTinh, getListXa, getListXaByHuyenId } from "../../../services";
import * as Yup from "yup";
import { heightSelectMutil } from "../../../component/StyleComponent";
import { SearchObject } from "../../models/TimKiemTruongHopBenhModels";
type Props = {
  setSearchObj?:  React.Dispatch<React.SetStateAction<SearchObject>>
};

const FilterSearchContainer = ({setSearchObj}: Props) => {
  const [openSearchAdvance, setOpenSearchAdvance] = useState<boolean>(false);
  const location = useLocation();

  const handleSubmit = (values: any) => {
    const formatData = { ...values };
    formatData.BenhIds= formatData.BenhIds?.map((item:any)=>item.id);
    setSearchObj && setSearchObj(formatData)
  };
   
  const validationSchema = Yup.object().shape({
    NgayNhapBaoCaoTu: Yup.date()
      .nullable()
      .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
      .max(Yup.ref('NgayNhapBaoCaoDen'), 'Ngày không được sau ngày nhập báo cáo đến'),
    NgayNhapBaoCaoDen: Yup.date()
      .nullable()
      .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
      .min(Yup.ref('NgayNhapBaoCaoTu'), 'Ngày họp không được trước ngày nhập báo cáo từ'),
    TuNgayKhoiPhat: Yup.date()
      .nullable()
      .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
      .max(Yup.ref('DenNgayKhoiPhat'), 'Ngày không được sau đến ngày khởi phát'),
    DenNgayKhoiPhat: Yup.date()
      .nullable()
      .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
      .min(Yup.ref('TuNgayKhoiPhat'), 'Ngày họp không được trước từ ngày khởi phát'),
    TuNgayNhapVien: Yup.date()
      .nullable()
      .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
      .max(Yup.ref('DenNgayNhapVien'), 'Ngày không được sau đến ngày nhập viện'),
    DenNgayNhapVien: Yup.date()
      .nullable()
      .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
      .min(Yup.ref('TuNgayNhapVien'), 'Ngày họp không được trước từ ngày nhập viện'),
    TuNgayRaVien: Yup.date()
      .nullable()
      .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
      .max(Yup.ref('DenNgayRaVien'), 'Ngày không được sau đến ngày đến ngày ra viện'),
    DenNgayRaVien: Yup.date()
      .nullable()
      .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
      .min(Yup.ref('TuNgayRaVien'), 'Ngày họp không được trước từ ngày ra viện'),
    TuNgayLayMau: Yup.date()
      .nullable()
      .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
      .max(Yup.ref('DenNgayLayMau'), 'Ngày không được sau đến ngày đến ngày lấy mẫu xét nghiệm'),
    DenNgayLayMau: Yup.date()
      .nullable()
      .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
      .min(Yup.ref('TuNgayLayMau'), 'Ngày họp không được trước từ ngày lấy mẫu xét nghiệm'),
    TuNgayTraKetQuaXn: Yup.date()
      .nullable()
      .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
      .max(Yup.ref('DenNgayTraKetQuaXn'), 'Ngày không được sau đến ngày đến ngày trả xét nghiệm'),
    DenNgayTraKetQuaXn: Yup.date()
      .nullable()
      .max(new Date(), 'Ngày không thể lớn hơn ngày hiện tại')
      .min(Yup.ref('TuNgayTraKetQuaXn'), 'Ngày họp không được trước từ ngày trả mẫu xét nghiệm'),
});

  return (
    <>
        <Formik 
          initialValues={SEARCH_OBJECT_INIT}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
         >
          {({ 
            values, 
            errors, 
            touched,
            handleSubmit,
            setFieldValue 
          }) => {
            
            const handleChange = (name: string, value: any) => {
              setFieldValue(name, value);
            };

            return (
              <form onSubmit={handleSubmit}>
                {location.pathname === "/tim-kiem-truong-hop-benh" && (
                  <div className="spaces mt-14 rounded">
                    <div className="spaces my-10 fw-700 fs-16 color-dark-red text-uppercase">
                      Tìm kiếm trường hợp bệnh
                    </div>
                    <div>
                      <Row>
                        <Col xs={12} lg={9}>
                          <div className="flex flex-middle">
                            <OCTTextValidator
                              placeholder="Tìm kiếm theo họ tên/ mã số bệnh nhân/ CMND/ Số điện thoại"
                              onChange={(e: any) => handleChange("Keyword", e.target.value)}
                              className="spaces width-100"
                              value={values?.Keyword}
                            />
                          </div>
                        </Col>
                        <Col xs={12} lg={3}>
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
                              onClick={() =>
                                setOpenSearchAdvance((prev) => !prev)
                              }
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
                            <Button className="button-primary spaces height-100 flex flex-middle"
                             onClick={()=>setSearchObj?.(SEARCH_OBJECT_INIT)}>
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
                    <Col xs={12} sm={6} md={4} xl={2}>
                      <LabelRequired label="Họ tên" className="spaces fw-500" />
                      <OCTTextValidator name="HoTen"
                        type="text" 
                        onChange={(e: any) => handleChange("HoTen", e.target.value)}
                        value={values.HoTen}
                      />
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={2}>
                      <LabelRequired
                        label="Giới tính"
                        className="spaces fw-500"
                      />
                      <OCTAutocomplete
                        onChange={(selectedOption) =>
                          handleChange("GioiTinh", selectedOption?.code)
                        }
                        className="spaces h-30 z-index-10"
                        name="GioiTinh"
                        options={GENDER_OPTION}
                        value={values?.GioiTinh}
                      />
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                      <LabelRequired
                        label="Nghề nghiệp"
                        className="spaces fw-500"
                      />
                      <OCTAutocomplete
                        onChange={(selectedOption) =>
                          handleChange("NgheNghiepId", selectedOption?.id)
                        }
                        className="spaces h-30 z-index-9"
                        name="NgheNghiepId"
                        options={[]}
                        value={values?.NgheNghiepId}
                        getOptionLabel={(option) => option.tenNghe}
                        searchObject={{}}
                        searchFunction={getListNgheNghiep}
                        urlData="data.data"
                      />
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                      <LabelRequired
                        label="Phân loại quản lý"
                        className="spaces fw-500"
                      />
                      <OCTAutocomplete
                        onChange={(selectedOption) =>
                          handleChange("PhanLoai", selectedOption?.code)
                        }
                        className="spaces h-30 z-index-8"
                        name="PhanLoai"
                        options={PHAN_LOAI_QUAN_LY}
                        value={values?.PhanLoai}
                      />
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                      <LabelRequired
                        label="Chọn bệnh"
                        className="spaces fw-500"
                      />
                      <OCTAutocomplete
                        onChange={(selectedOption) =>
                          handleChange("BenhIds",selectedOption)
                        }
                        isMulti={true}
                        styles={heightSelectMutil("auto")}
                        getOptionValue={option=>option.id}
                        getOptionLabel={(option)=>option.tenBenhChanDoan}
                        className="spaces h-30 z-index-7"
                        name="BenhIds"
                        options={[]}
                        value={values?.BenhIds}
                        searchObject={{}}
                        searchFunction={getListBenhChanDoan}
                        urlData='data.data'
                      />
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                      <LabelRequired
                        label="Tình trạng hiện nay"
                        className="spaces fw-500"
                      />
                      <OCTAutocomplete
                        onChange={(selectedOption) =>
                          handleChange("TinhTrangHienNay", selectedOption?.code)
                        }
                        className="spaces h-30 z-index-6"
                        name="TinhTrangHienNay"
                        options={TINH_TRANG_HIEN_NAY}
                        value={values?.TinhTrangHienNay}
                      />
                    </Col>
                  </Row>
                  <div className="location">
                    <div className="spaces fs-16 fw-600 my-14">
                      Nơi ở hiện nay của bệnh nhân/ Địa chỉ cơ sở báo cáo
                    </div>
                    <Row>
                      <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                        <LabelRequired
                          label="Tỉnh/Thành phố"
                          className="spaces fw-500"
                        />
                        <OCTAutocomplete
                          onChange={(selectedOption) =>
                            handleChange("TinhId", selectedOption?.id)
                          }
                          className="spaces h-30 z-index-5"
                          name="TinhId"
                          options={[]}
                          value={values?.TinhId}
                          getOptionLabel={(option) => option.tenTinh}
                          searchObject={{}}
                          searchFunction={getListTinh}
                          urlData='data.data'
                        />
                      </Col>
                      <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                        <LabelRequired
                          label="Huyện/Quận"
                          className="spaces fw-500"
                        />
                        <OCTAutocomplete
                          onChange={(selectedOption) =>
                            handleChange("HuyenId", selectedOption?.id)
                          }
                          className="spaces h-30 z-index-4"
                          name="HuyenId"
                          options={[]}
                          value={values?.HuyenId}
                          getOptionLabel={(option) => option.tenHuyen}
                          searchObject={{}}
                          searchFunction={()=> values?.TinhId ? getListHuyenByTinhId(values?.TinhId) : getListHuyen()}
                          urlData='data.data'
                        />
                      </Col>
                      <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                        <LabelRequired
                          label="Xã/Phường"
                          className="spaces fw-500"
                        />
                        <OCTAutocomplete
                          onChange={(selectedOption) =>
                          handleChange("XaId", selectedOption?.id)
                          }
                          className="spaces h-30 z-index-3"
                          name="XaId"
                          options={[]}
                          value={values?.XaId}
                          getOptionLabel={(option) => option.tenXa}
                          searchObject={{}}
                          searchFunction={() => values?.HuyenId ? getListXaByHuyenId(values.HuyenId) : getListXa()}
                          urlData='data.data'
                        />
                      </Col>
                      <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                        <LabelRequired
                          label="Ngày nhập báo cáo từ"
                          className="spaces fw-500"
                        />
                        <OCTTextValidator 
                          name="NgayNhapBaoCaoTu"
                          type="date"  
                          onChange={(e: any) => handleChange("NgayNhapBaoCaoTu", e.target.value)}
                          value={values.NgayNhapBaoCaoTu}
                          errors={errors?.NgayNhapBaoCaoTu}
                          touched={touched?.NgayNhapBaoCaoTu}
                        />
                      </Col>
                      <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                        <LabelRequired
                          label="Ngày nhập báo cáo đến"
                          className="fw-500"
                        />
                        <OCTTextValidator
                          name="NgayNhapBaoCaoDen"
                          type="date"
                          onChange={(e: any) => handleChange("NgayNhapBaoCaoDen", e.target.value)}
                          value={values.NgayNhapBaoCaoDen}
                          errors={errors?.NgayNhapBaoCaoDen}
                          touched={touched?.NgayNhapBaoCaoDen}
                        />
                      </Col>
                      <Col xs={12} sm={6} md={4} lg={3} xl={2}>
                        <LabelRequired
                          label="Cơ sở báo cáo"
                          className="spaces fw-500"
                        />
                        <OCTAutocomplete
                          onChange={(selectedOption) =>
                            handleChange("coSoCreateId", selectedOption?.CoSoId)
                          }
                          className="spaces h-30 z-index-1"
                          name="coSoCreateId"
                          getOptionLabel={(option)=>option.tenCoSo}
                          options={[]}
                          value={values?.coSoCreateId}
                          searchObject={{}}
                          searchFunction={getListCoSo}
                          urlData='data.data'
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
                              name="TuNgayKhoiPhat" 
                              type="date" 
                              onChange={(e: any) => handleChange("TuNgayKhoiPhat", e.target.value)}
                              value={values.TuNgayKhoiPhat}
                              errors={errors?.TuNgayKhoiPhat}
                              touched={touched?.TuNgayKhoiPhat}
                            />
                          </Col>
                          <Col xs={12} sm={6} md={4} lg={2}>
                            <LabelRequired
                              label="Ngày khởi phát đến"
                              className="fw-500"
                            />
                            <OCTTextValidator
                              name="DenNgayKhoiPhat"
                              type="date"
                              onChange={(e: any) => handleChange("DenNgayKhoiPhat", e.target.value)}
                              value={values.DenNgayKhoiPhat}
                              errors={errors?.DenNgayKhoiPhat}
                              touched={touched?.DenNgayKhoiPhat}
                            />
                          </Col>
                          <Col xs={12} sm={6} md={4} lg={2}>
                            <LabelRequired
                              label="Ngày nhập viện từ"
                              className="fw-500"
                            />
                            <OCTTextValidator 
                              name="TuNgayNhapVien"
                              type="date"
                              onChange={(e: any) => handleChange("TuNgayNhapVien", e.target.value)}
                              value={values.TuNgayNhapVien}
                              errors={errors?.TuNgayNhapVien}
                              touched={touched?.TuNgayNhapVien}
                            />
                          </Col>
                          <Col xs={12} sm={6} md={4} lg={2}>
                            <LabelRequired
                              label="Ngày nhập viện đến"
                              className="fw-500"
                            />
                            <OCTTextValidator
                              name="DenNgayNhapVien"
                              type="date"
                              onChange={(e: any) => handleChange("DenNgayNhapVien", e.target.value)}
                              value={values.DenNgayNhapVien}
                              errors={errors?.DenNgayNhapVien}
                              touched={touched?.DenNgayNhapVien}
                            />
                          </Col>
                          <Col xs={12} sm={6} md={4} lg={2}>
                            <LabelRequired
                              label="Ngày ra viện/tử vong từ"
                              className="fw-500"
                            />
                            <OCTTextValidator
                              name="TuNgayRaVien"
                              type="date"
                              onChange={(e: any) => handleChange("TuNgayRaVien", e.target.value)}
                              value={values.TuNgayRaVien}
                              errors={errors?.TuNgayRaVien}
                              touched={touched?.TuNgayRaVien}
                            />
                          </Col>
                          <Col xs={12} sm={6} md={4} lg={2}>
                            <LabelRequired
                              label="Ngày ra viện/tử vong đến"
                              className="fw-500"
                            />
                            <OCTTextValidator
                              name="DenNgayRaVien" 
                              type="date"
                              onChange={(e: any) => handleChange("DenNgayRaVien", e.target.value)}
                              value={values.DenNgayRaVien}
                              errors={errors?.DenNgayRaVien}
                              touched={touched?.DenNgayRaVien}
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
                              name="TuNgayLayMau" 
                              type="date"
                              onChange={(e: any) => handleChange("TuNgayLayMau", e.target.value)}
                              value={values.TuNgayLayMau}
                              errors={errors?.TuNgayLayMau}
                              touched={touched?.TuNgayLayMau}
                            />
                          </Col>
                          <Col xs={12} sm={6} md={4} lg={2}>
                            <LabelRequired
                              label="Ngày lấy mẫu xét nghiệm đến"
                              className="fw-500"
                            />
                            <OCTTextValidator
                              name="DenNgayLayMau"
                              type="date"
                              onChange={(e: any) => handleChange("DenNgayLayMau", e.target.value)}
                              value={values.DenNgayLayMau}
                              errors={errors?.DenNgayLayMau}
                              touched={touched?.DenNgayLayMau}
                            />
                          </Col>
                          <Col xs={12} sm={6} md={4} lg={2}>
                            <LabelRequired
                              label="Ngày trả kết quả từ"
                              className="fw-500"
                            />
                            <OCTTextValidator 
                              name="TuNgayTraKetQuaXn"
                              type="date"
                              onChange={(e: any) => handleChange("TuNgayTraKetQuaXn", e.target.value)}
                              value={values.TuNgayTraKetQuaXn}
                              errors={errors?.TuNgayTraKetQuaXn}
                              touched={touched?.TuNgayTraKetQuaXn}
                            />
                          </Col>
                          <Col xs={12} sm={6} md={4} lg={2}>
                            <LabelRequired
                              label="Ngày trả kết quả đến"
                              className="fw-500"
                            />
                            <OCTTextValidator 
                              name="DenNgayTraKetQuaXn"
                              type="date"
                              onChange={(e: any) => handleChange("DenNgayTraKetQuaXn", e.target.value)}
                              value={values.DenNgayTraKetQuaXn}
                              errors={errors?.DenNgayTraKetQuaXn}
                              touched={touched?.DenNgayTraKetQuaXn}
                            />
                          </Col>
                          <Col xs={12} sm={6} md={4} lg={2}>
                            <LabelRequired
                              label="Kết quả xét nghiệm"
                              className="spaces fw-500"
                            />
                            <OCTAutocomplete
                              onChange={(selectedOption) =>
                                handleChange("KqXetNghiem", selectedOption?.code)
                              }
                              className="spaces h-30 z-index-4"
                              name="KqXetNghiem"
                              options={KQ_XET_NGHIEM}
                              value={values?.KqXetNghiem}
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
                            <OCTAutocomplete
                              onChange={(selectedOption) =>
                                handleChange("DonViThucHienXn", selectedOption?.id)
                              }
                              className="spaces h-30 z-index-3"
                              name="DonViThucHienXn"
                              options={[]}
                              value={values?.DonViThucHienXn}
                              getOptionLabel={(option) => option.tenDonVi}
                              searchObject={{}}
                              searchFunction={getListDmDonViThucHienXetNghiem}
                              urlData='data.data'
                             />
                          </Col>
                          <Col xs={12} sm={6} md={4}>
                            <LabelRequired
                              label="Cơ sở điều trị"
                              className="spaces fw-500"
                            />
                            <OCTAutocomplete
                              onChange={(selectedOption) =>
                                handleChange("CoSoDieuTriId", selectedOption?.id)
                              }
                              className="spaces h-30 z-index-2"
                              name="CoSoDieuTriId"
                              options={[]}
                              value={values?.CoSoDieuTriId}
                              getOptionLabel={(option) => option.tenCoSo}
                              searchObject={{}}
                              searchFunction={getListCoSo}
                              urlData='data.data'
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
