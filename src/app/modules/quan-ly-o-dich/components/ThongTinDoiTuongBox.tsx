import { OCTAutocomplete, OCTTextValidator } from "@oceantech/oceantech-ui"
import { useFormikContext } from "formik"
import { Col, Form, Row } from "react-bootstrap"
import RadioGroup from "../../component/input-field/RadioGroup"
import LabelRequired from "../../component/LabelRequired"
import { GENDER_OPT } from "../../quan-ly-truong-hop-benh/danh-sach-truong-hop-benh/constants/constant"
import { calculateAge } from "../../utils/AppFunction"
import { IThongTinODich } from "../models/quanLyODichModels"
import { getListDanToc, getListHuyenByTinhId, getListNgheNghiep, getListTinh, getListXaByHuyenId } from "../../services"
import { handleChangeHuyen, handleChangeTinh, handleChangeXa, haveInfomation } from "../../utils/FunctionUtils"
import TextValidator from "../../component/input-field/TextValidator"


const ThongTinDoiTuongBox = () => {

    const { values, handleChange, errors, touched, setFieldValue, setValues } = useFormikContext<IThongTinODich>()
    const existTHB = Boolean(values?.doiTuongMacBenh?.doiTuongMacBenhId)

    return (
        <div className="section-container">
            <div className="spaces mb-10 fs-18 fw-bold text-uppercase color-dark-red">
                Thông tin đối tượng
            </div>
            <div className="border-top">
                <Row className="spaces mt-5">
                    <Col xs={12} sm={12} md={12} lg={12} className="spaces mt-10">
                        {values?.doiTuongMacBenh.maSo &&
                            <>
                                <LabelRequired
                                    label="Mã số:"
                                    className="spaces fw-500 mb-5"
                                />
                                <span>{values?.doiTuongMacBenh.maSo}</span>
                            </>
                        }
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                        <OCTTextValidator
                            lable="Họ tên"
                            name="doiTuongMacBenh.hoTen"
                            isRequired
                            value={values?.doiTuongMacBenh?.hoTen}
                            onChange={handleChange}
                            errors={errors?.doiTuongMacBenh?.hoTen}
                            touched={touched?.doiTuongMacBenh?.hoTen}
                            disabled={existTHB}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                        <div className="d-flex spaces gap-15">
                            <TextValidator
                                lable="Ngày sinh"
                                type="date"
                                isRequired
                                name="doiTuongMacBenh.ngaySinh"
                                value={values?.doiTuongMacBenh?.ngaySinh}
                                onChange={handleChange}
                                errors={errors?.doiTuongMacBenh?.ngaySinh}
                                touched={touched?.doiTuongMacBenh?.ngaySinh}
                                disabled={existTHB}
                            />
                            <OCTTextValidator
                                lable="Tuổi"
                                type="text"
                                name="tuoi"
                                value={calculateAge(values?.doiTuongMacBenh?.ngaySinh) || ""}
                                disabled
                            />
                        </div>
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                        <OCTAutocomplete
                            lable="Nghề nghiệp"
                            searchFunction={getListNgheNghiep}
                            urlData='data.data'
                            getOptionLabel={(option) => option?.tenNghe}
                            options={[]}
                            value={values.doiTuongMacBenh?.ngheNghiep}
                            onChange={(option) => {
                                setFieldValue("doiTuongMacBenh.ngheNghiep", option)
                            }}
                            searchObject={{}}
                            isRequired
                            errors={errors.doiTuongMacBenh?.ngheNghiep}
                            touched={touched.doiTuongMacBenh?.ngheNghiep}
                            isDisabled={existTHB}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                        <OCTTextValidator
                            lable="Nơi làm việc/Học tập"
                            type="text"
                            name="doiTuongMacBenh.noiLamViecHocTap"
                            value={values.doiTuongMacBenh?.noiLamViecHocTap}
                            onChange={handleChange}
                            disabled={existTHB}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                        <OCTAutocomplete
                            lable="Dân tộc"
                            searchFunction={getListDanToc}
                            urlData='data.data'
                            getOptionLabel={(option) => option?.tenDanToc}
                            options={[]}
                            value={values.doiTuongMacBenh?.danToc}
                            onChange={(option) => setFieldValue("doiTuongMacBenh.danToc", option)}
                            searchObject={{}}
                            isRequired
                            errors={errors.doiTuongMacBenh?.danToc}
                            touched={touched.doiTuongMacBenh?.danToc}
                            isDisabled={existTHB}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                        <RadioGroup
                            name='doiTuongMacBenh.gioiTinh'
                            isRequired
                            lable='Giới tính'
                            value={values.doiTuongMacBenh?.gioiTinh}
                            radioItemList={GENDER_OPT}
                            disabledFields={existTHB ? GENDER_OPT.map(item => item.code) : []}
                            handleChange={handleChange}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                        <OCTTextValidator
                            lable="CCCD"
                            type="text"
                            isRequired
                            name="doiTuongMacBenh.cmnd"
                            value={values.doiTuongMacBenh?.cmnd}
                            onChange={handleChange}
                            errors={errors?.doiTuongMacBenh?.cmnd}
                            touched={touched?.doiTuongMacBenh?.cmnd}
                            disabled={!values.doiTuongMacBenh?.haveCmnd || existTHB}

                        />
                        <Form.Check
                            disabled={existTHB}
                            className='mt-2'
                            name='doiTuongMacBenh.haveCmnd'
                            label='Không khai thác được CCCD'
                            checked={!values.doiTuongMacBenh?.haveCmnd}
                            onChange={(event) => {
                                haveInfomation(setValues, "doiTuongMacBenh", "haveCmnd", "cmnd", event)

                            }}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                        <OCTTextValidator
                            lable="Điện thoại"
                            type="text"
                            isRequired
                            name="doiTuongMacBenh.dienThoai"
                            value={values.doiTuongMacBenh?.dienThoai}
                            onChange={handleChange}
                            errors={errors?.doiTuongMacBenh?.dienThoai}
                            touched={touched?.doiTuongMacBenh?.dienThoai}
                            disabled={!values.doiTuongMacBenh?.haveDienThoai || existTHB}

                        />
                        <Form.Check
                            disabled={existTHB}
                            className='mt-2'
                            label='Không khai thác được SĐT'
                            name='doiTuongMacBenh.haveDienThoai'
                            checked={!values.doiTuongMacBenh?.haveDienThoai}
                            onChange={(event) => {
                                haveInfomation(setValues, "doiTuongMacBenh", "haveDienThoai", "dienThoai", event)
                            }}
                        />
                    </Col>
                </Row>
                <Row className="spaces mt-10">
                    <div className="fw-bold">Thông tin địa thường trú (địa chỉ hộ khẩu)</div>
                    <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                        <OCTTextValidator
                            lable="Địa chỉ thường trú"
                            type="text"
                            value={values.doiTuongMacBenh?.diaChiThuongTru}
                            name="doiTuongMacBenh.diaChiThuongTru"
                            onChange={handleChange}
                            disabled={existTHB}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                        <OCTAutocomplete
                            lable="Tỉnh/TP thường chú"
                            menuPlacement="top"
                            searchFunction={getListTinh}
                            urlData='data.data'
                            getOptionLabel={(option) => option?.tenTinh}
                            options={[]}
                            name='doiTuongMacBenh.tinhThuongTru'
                            searchObject={{}}
                            onChange={(option) => {
                                handleChangeTinh(setValues, 'doiTuongMacBenh', 'tinhThuongTru', 'huyenThuongTru', 'xaThuongTru', option)
                            }}
                            value={values.doiTuongMacBenh?.tinhThuongTru}
                            isDisabled={existTHB}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                        <OCTAutocomplete
                            menuPlacement="top"
                            lable="Quận/Huyện thường chú"
                            searchFunction={() => getListHuyenByTinhId(values.doiTuongMacBenh?.tinhThuongTru?.id)}
                            urlData='data.data'
                            getOptionLabel={(option) => option?.tenHuyen}
                            options={[]}
                            searchObject={{}}
                            value={values.doiTuongMacBenh?.huyenThuongTru}
                            isDisabled={!values.doiTuongMacBenh?.tinhThuongTru || existTHB}
                            onChange={(option) => {
                                handleChangeHuyen(setValues, 'doiTuongMacBenh', 'huyenThuongTru', 'xaThuongTru', option)
                            }}
                            dependencies={[values.doiTuongMacBenh?.tinhThuongTru]}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                        <OCTAutocomplete
                            menuPlacement="top"
                            lable="Phường/Xã thường trú"
                            searchFunction={() => getListXaByHuyenId(values.doiTuongMacBenh?.huyenThuongTru?.id)}
                            urlData='data.data'
                            getOptionLabel={(option) => option?.tenXa}
                            options={[]}
                            searchObject={{}}
                            value={values.doiTuongMacBenh?.xaThuongTru}
                            isDisabled={!values.doiTuongMacBenh?.huyenThuongTru || existTHB}
                            onChange={(option) => {
                                handleChangeXa(setValues, 'doiTuongMacBenh', 'xaThuongTru', option)
                            }}
                            dependencies={[values.doiTuongMacBenh?.huyenThuongTru]}
                        />
                    </Col>
                </Row>
                <Row className="spaces mt-10">
                    <div className="fw-bold">Thông tin địa chỉ nơi ở hiện nay</div>
                    <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                        <OCTTextValidator
                            lable="Địa chỉ hiện nay"
                            type="text"
                            name="doiTuongMacBenh.diaChiHienNay"
                            onChange={handleChange}
                            isRequired
                            value={values.doiTuongMacBenh?.diaChiHienNay}
                            errors={errors?.doiTuongMacBenh?.diaChiHienNay}
                            touched={touched?.doiTuongMacBenh?.diaChiHienNay}
                            disabled={existTHB}

                        />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                        <OCTAutocomplete
                            lable="Tỉnh/TP hiện nay"
                            menuPlacement="top"
                            searchFunction={getListTinh}
                            urlData='data.data'
                            getOptionLabel={(option) => option?.tenTinh}
                            options={[]}
                            name='doiTuongMacBenh.tinhHienNay'
                            searchObject={{}}
                            onChange={(option) => {
                                handleChangeTinh(setValues, 'doiTuongMacBenh', 'tinhHienNay', 'huyenHienNay', 'xaHienNay', option)
                            }}
                            isRequired
                            value={values.doiTuongMacBenh?.tinhHienNay}
                            errors={errors.doiTuongMacBenh?.tinhHienNay}
                            touched={touched.doiTuongMacBenh?.tinhHienNay}
                            isDisabled={existTHB}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                        <OCTAutocomplete
                            menuPlacement="top"
                            lable="Quận/Huyện hiện nay"
                            searchFunction={() => getListHuyenByTinhId(values.doiTuongMacBenh?.tinhHienNay?.id)}
                            urlData='data.data'
                            getOptionLabel={(option) => option?.tenHuyen}
                            options={[]}
                            searchObject={{}}
                            value={values.doiTuongMacBenh?.huyenHienNay}
                            isDisabled={!values.doiTuongMacBenh?.tinhHienNay || existTHB}
                            onChange={(option) => {
                                handleChangeHuyen(setValues, 'doiTuongMacBenh', 'huyenHienNay', 'xaHienNay', option)
                            }}
                            dependencies={[values.doiTuongMacBenh?.tinhHienNay]}
                            isRequired
                            errors={errors.doiTuongMacBenh?.huyenHienNay}
                            touched={touched.doiTuongMacBenh?.huyenHienNay}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={6} lg={6} className="spaces mt-10">
                        <OCTAutocomplete
                            menuPlacement="top"
                            lable="Phường/Xã hiện nay"
                            searchFunction={() => getListXaByHuyenId(values.doiTuongMacBenh?.huyenHienNay?.id)}
                            urlData='data.data'
                            getOptionLabel={(option) => option?.tenXa}
                            options={[]}
                            searchObject={{}}
                            value={values.doiTuongMacBenh?.xaHienNay}
                            isDisabled={!values.doiTuongMacBenh?.huyenHienNay || existTHB}
                            onChange={(option) => {
                                handleChangeXa(setValues, 'doiTuongMacBenh', 'xaHienNay', option)
                            }}
                            dependencies={[values?.doiTuongMacBenh?.huyenHienNay]}
                            isRequired
                            errors={errors.doiTuongMacBenh?.xaHienNay}
                            touched={touched.doiTuongMacBenh?.xaHienNay}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ThongTinDoiTuongBox