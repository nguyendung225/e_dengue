import { OCTAutocomplete, OCTTextValidator } from '@oceantech/oceantech-ui';
import { useFormikContext } from 'formik';
import { Form } from 'react-bootstrap';
import { Col, Row } from '../../../component/Grid';
import RadioGroup from '../../../component/input-field/RadioGroup';
import { getListDanToc, getListHuyenByTinhId, getListNgheNghiep, getListTinh, getListXaByHuyenId } from '../../../services';
import { calculateAge } from '../../../utils/AppFunction';
import { GENDER_OPT } from '../constants/constant';
import { TruongHopBenh } from '../model/Model';
type Props = {
    onlyView?: boolean
}

const ThongTinHanhChinhTab = ({onlyView}: Props) => {
    const { values, handleChange, errors, touched, setFieldValue, setValues } = useFormikContext<TruongHopBenh>()
    return (
        <Row>
            <Col xl={12}>
                {values?.doiTuongMacBenh?.maSo && <div className='fw-bold spaces mt-12'>MÃ SỐ : {values?.doiTuongMacBenh?.maSo}</div>}
            </Col>
            <Col xl={3}>
                <OCTTextValidator
                    lable="Họ tên"
                    name="doiTuongMacBenh.hoTen"
                    isRequired
                    value={values?.doiTuongMacBenh?.hoTen}
                    onChange={handleChange}
                    errors={errors?.doiTuongMacBenh?.hoTen}
                    touched={touched?.doiTuongMacBenh?.hoTen}
                    disabled={onlyView}
                />
            </Col>
            <Col xl={2}>
                <OCTTextValidator
                    lable="Ngày sinh"
                    type="date"
                    isRequired
                    name="doiTuongMacBenh.ngaySinh"
                    value={values?.doiTuongMacBenh?.ngaySinh}
                    onChange={handleChange}
                    errors={errors?.doiTuongMacBenh?.ngaySinh}
                    touched={touched?.doiTuongMacBenh?.ngaySinh}
                    disabled={onlyView}
                />
            </Col>
            <Col xl={1}>
                <OCTTextValidator
                    lable="Tuổi"
                    type="text"
                    name="tuoi"
                    value={calculateAge(values?.doiTuongMacBenh?.ngaySinh) || ""}
                    disabled
                />
            </Col>
            <Col xl={3}>
                <RadioGroup
                    name='doiTuongMacBenh.gioiTinh'
                    isRequired
                    lable='Giới tính'
                    value={values.doiTuongMacBenh?.gioiTinh}
                    radioItemList={GENDER_OPT}
                    handleChange={handleChange}
                    disabledFields={onlyView ? GENDER_OPT.map(item => item.code) : []}
                />
            </Col>
            <Col xl={3}>
                <OCTAutocomplete
                    lable="Nghề nghiệp"
                    searchFunction={getListNgheNghiep}
                    urlData='data.data'
                    getOptionLabel={(option) => option.tenNghe}
                    options={[]}
                    value={values.doiTuongMacBenh?.ngheNghiep}
                    onChange={(option) => {
                        setFieldValue("doiTuongMacBenh.ngheNghiep", option)
                    }}
                    searchObject={{}}
                    isRequired
                    errors={errors.doiTuongMacBenh?.ngheNghiep}
                    touched={touched.doiTuongMacBenh?.ngheNghiep}
                    isDisabled={onlyView}
                />
            </Col>
            <Col xl={3}>
                <OCTAutocomplete
                    lable="Dân tộc"
                    searchFunction={getListDanToc}
                    urlData='data.data'
                    getOptionLabel={(option) => option.tenDanToc}
                    options={[]}
                    value={values.doiTuongMacBenh?.danToc}
                    onChange={(option) => setFieldValue("doiTuongMacBenh.danToc", option)}
                    searchObject={{}}
                    isRequired
                    errors={errors.doiTuongMacBenh?.danToc}
                    touched={touched.doiTuongMacBenh?.danToc}
                    isDisabled={onlyView}
                />
            </Col>
            <Col xl={3}>
                <OCTTextValidator
                    lable="CCCD"
                    type="text"
                    isRequired
                    name="doiTuongMacBenh.cmnd"
                    value={values.doiTuongMacBenh?.cmnd}
                    onChange={handleChange}
                    errors={errors?.doiTuongMacBenh?.cmnd}
                    touched={touched?.doiTuongMacBenh?.cmnd}
                    disabled={!values.doiTuongMacBenh?.haveCmnd || onlyView}
                />
                <Form.Check
                    disabled={onlyView}
                    className='mt-2'
                    name='doiTuongMacBenh.haveCmnd'
                    label='Không khai thác được CCCD'
                    checked={!values.doiTuongMacBenh?.haveCmnd}
                    onChange={(event) => {
                        setValues({
                            ...values,
                            doiTuongMacBenh: {
                                ...values.doiTuongMacBenh,
                                haveCmnd: !event.target.checked,
                                cmnd: ""
                            },
                        });

                    }}
                />
            </Col>
            <Col xl={3}>
                <OCTTextValidator
                    lable="Điện thoại"
                    type="text"
                    isRequired
                    name="doiTuongMacBenh.dienThoai"
                    value={values.doiTuongMacBenh?.dienThoai}
                    onChange={handleChange}
                    errors={errors?.doiTuongMacBenh?.dienThoai}
                    touched={touched?.doiTuongMacBenh?.dienThoai}
                    disabled={!values.doiTuongMacBenh?.haveDienThoai || onlyView}

                />
                <Form.Check
                    disabled={onlyView}
                    className='mt-2'
                    label='Không khai thác được SĐT'
                    name='doiTuongMacBenh.haveDienThoai'
                    checked={!values.doiTuongMacBenh?.haveDienThoai}
                    onChange={(event) => {
                        setValues({
                            ...values,
                            doiTuongMacBenh: {
                                ...values.doiTuongMacBenh,
                                haveDienThoai: !event.target.checked,
                                dienThoai: ""
                            },
                        });
                    }}
                />
            </Col>
            <Col xl={3}>
                <OCTTextValidator
                    lable="Nơi làm việc/Học tập"
                    type="text"
                    name="doiTuongMacBenh.noiLamViecHocTap"
                    value={values.doiTuongMacBenh?.noiLamViecHocTap}
                    onChange={handleChange}
                    disabled={onlyView}

                />
            </Col>
            <Col xs={12}>
                <div className='fw-bold'>Thông tin địa chỉ hiện nay</div>
            </Col>
            <Col xl={3}>
                <OCTTextValidator
                    lable="Địa chỉ hiện nay"
                    type="text"
                    name="doiTuongMacBenh.diaChiHienNay"
                    onChange={handleChange}
                    isRequired
                    value={values.doiTuongMacBenh?.diaChiHienNay}
                    errors={errors?.doiTuongMacBenh?.diaChiHienNay}
                    touched={touched?.doiTuongMacBenh?.diaChiHienNay}
                    disabled={onlyView}

                />
            </Col>
            <Col xl={3}>
                <OCTAutocomplete
                    lable="Tỉnh/TP hiện nay"
                    menuPlacement="top"
                    searchFunction={getListTinh}
                    urlData='data.data'
                    getOptionLabel={(option) => option.tenTinh}
                    options={[]}
                    name='doiTuongMacBenh.tinhHienNay'
                    searchObject={{}}
                    onChange={(option) => {
                        setValues({
                            ...values,
                            doiTuongMacBenh: {
                                ...values.doiTuongMacBenh,
                                tinhHienNay: option,
                                huyenHienNay: null,
                                xaHienNay: null
                            },
                        })
                    }}
                    isRequired
                    value={values.doiTuongMacBenh?.tinhHienNay}
                    errors={errors.doiTuongMacBenh?.tinhHienNay}
                    touched={touched.doiTuongMacBenh?.tinhHienNay}
                    isDisabled={onlyView}

                />
            </Col>
            <Col xl={3}>
                <OCTAutocomplete
                    menuPlacement="top"
                    lable="Quận/Huyện hiện nay"
                    searchFunction={() => getListHuyenByTinhId(values.doiTuongMacBenh?.tinhHienNay?.id)}
                    urlData='data.data'
                    getOptionLabel={(option) => option.tenHuyen}
                    options={[]}
                    searchObject={{}}
                    value={values.doiTuongMacBenh?.huyenHienNay}
                    isDisabled={!values.doiTuongMacBenh?.tinhHienNay || onlyView}
                    onChange={(option) => {
                        setValues({
                            ...values,
                            doiTuongMacBenh: {
                                ...values.doiTuongMacBenh,
                                huyenHienNay: option,
                                xaHienNay: null
                            },
                        })
                    }}
                    dependencies={[values.doiTuongMacBenh?.tinhHienNay]}
                    isRequired
                    errors={errors.doiTuongMacBenh?.huyenHienNay}
                    touched={touched.doiTuongMacBenh?.huyenHienNay}
                />
            </Col>
            <Col xl={3}>
                <OCTAutocomplete
                    menuPlacement="top"
                    lable="Phường/Xã hiện nay"
                    searchFunction={() => getListXaByHuyenId(values.doiTuongMacBenh?.huyenHienNay?.id)}
                    urlData='data.data'
                    getOptionLabel={(option) => option.tenXa}
                    options={[]}
                    searchObject={{}}
                    value={values.doiTuongMacBenh?.xaHienNay}
                    isDisabled={!values.doiTuongMacBenh?.huyenHienNay || onlyView}
                    onChange={(option) => {
                        setFieldValue("doiTuongMacBenh.xaHienNay", option)
                    }}
                    dependencies={[values?.doiTuongMacBenh?.huyenHienNay]}
                    isRequired
                    errors={errors.doiTuongMacBenh?.xaHienNay}
                    touched={touched.doiTuongMacBenh?.xaHienNay}
                />

            </Col>
            <Col xs={12}>
                <div className='fw-bold'>Thông tin địa chỉ thường trú</div>
            </Col>
            <Col xl={3}>
                <OCTTextValidator
                    lable="Địa chỉ thường trú"
                    type="text"
                    value={values.doiTuongMacBenh?.diaChiThuongTru}
                    name="doiTuongMacBenh.diaChiThuongTru"
                    onChange={handleChange}
                    disabled={onlyView}
                />
            </Col>
            <Col xl={3}>
                <OCTAutocomplete
                    lable="Tỉnh/TP thường chú"
                    menuPlacement="top"
                    searchFunction={getListTinh}
                    urlData='data.data'
                    getOptionLabel={(option) => option.tenTinh}
                    options={[]}
                    name='doiTuongMacBenh.tinhThuongTru'
                    searchObject={{}}
                    onChange={(option) => {
                        setValues({
                            ...values,
                            doiTuongMacBenh: {
                                ...values.doiTuongMacBenh,
                                tinhThuongTru: option,
                                huyenThuongTru: null,
                                xaThuongTru: null
                            },
                        })
                    }}
                    isDisabled={onlyView}
                    value={values.doiTuongMacBenh?.tinhThuongTru}

                />
            </Col>
            <Col xl={3}>
                <OCTAutocomplete
                    menuPlacement="top"
                    lable="Quận/Huyện thường chú"
                    searchFunction={() => getListHuyenByTinhId(values.doiTuongMacBenh?.tinhThuongTru?.id)}
                    urlData='data.data'
                    getOptionLabel={(option) => option.tenHuyen}
                    options={[]}
                    searchObject={{}}
                    value={values.doiTuongMacBenh?.huyenThuongTru}
                    isDisabled={!values.doiTuongMacBenh?.tinhThuongTru || onlyView}
                    onChange={(option) => {
                        setValues({
                            ...values,
                            doiTuongMacBenh: {
                                ...values.doiTuongMacBenh,
                                huyenThuongTru: option,
                                xaThuongTru: null
                            },
                        })
                    }}
                    dependencies={[values.doiTuongMacBenh?.tinhThuongTru]}
                />
            </Col>
            <Col xl={3}>
                <OCTAutocomplete
                    menuPlacement="top"
                    lable="Phường/Xã thường trú"
                    searchFunction={() => getListXaByHuyenId(values.doiTuongMacBenh?.huyenThuongTru?.id)}
                    urlData='data.data'
                    getOptionLabel={(option) => option.tenXa}
                    options={[]}
                    searchObject={{}}
                    value={values.doiTuongMacBenh?.xaThuongTru}
                    isDisabled={!values.doiTuongMacBenh?.huyenThuongTru || onlyView}
                    onChange={(option) => {
                        setFieldValue("doiTuongMacBenh.xaThuongTru", option)
                    }}
                    dependencies={[values.doiTuongMacBenh?.huyenThuongTru]}
                />
            </Col>
        </Row>
    )
}

export default ThongTinHanhChinhTab