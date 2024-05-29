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
}

const ThongTinHanhChinhTab = (props: Props) => {
    const { values, handleChange, errors, touched, setFieldValue, setValues } = useFormikContext<TruongHopBenh>()

    return (
        <Row >
            <Col xl={12}>
                <div className='fw-bold spaces mt-12'>MÃ SỐ</div>
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
                />
            </Col>
            <Col xl={3}>
                <OCTAutocomplete
                    lable="Nghề nghiệp"
                    searchFunction={getListNgheNghiep}
                    urlData='data.data'
                    getOptionLabel={(option) => option.tenNghe}
                    options={[]}
                    value={values.doiTuongMacBenh?.ngheNghiepId}
                    onChange={(option) => {
                        setFieldValue("doiTuongMacBenh.ngheNghiepId", option?.id)
                    }}
                    searchObject={{}}
                    isRequired
                    errors={errors.doiTuongMacBenh?.ngheNghiepId}
                    touched={touched.doiTuongMacBenh?.ngheNghiepId}
                />
            </Col>
            <Col xl={3}>
                <OCTAutocomplete
                    lable="Dân tộc"
                    searchFunction={getListDanToc}
                    urlData='data.data'
                    getOptionLabel={(option) => option.tenDanToc}
                    options={[]}
                    value={values.doiTuongMacBenh?.danTocId}
                    onChange={(option) => setFieldValue("doiTuongMacBenh.danTocId", option?.id)}
                    searchObject={{}}
                    isRequired
                    errors={errors.doiTuongMacBenh?.danTocId}
                    touched={touched.doiTuongMacBenh?.danTocId}
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
                    disabled={!values.doiTuongMacBenh?.haveCmnd}
                />
                <Form.Check
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
                    disabled={!values.doiTuongMacBenh?.haveDienThoai}
                />
                <Form.Check
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
                    name='doiTuongMacBenh.tinhIdHienNay'
                    searchObject={{}}
                    onChange={(option) => {
                        setValues({
                            ...values,
                            doiTuongMacBenh: {
                                ...values.doiTuongMacBenh,
                                tinhIdHienNay: option?.id,
                                huyenIdHienNay: null,
                                xaIdHienNay: null
                            },
                        })
                    }}
                    isRequired
                    value={values.doiTuongMacBenh?.tinhIdHienNay}
                    errors={errors.doiTuongMacBenh?.tinhIdHienNay}
                    touched={touched.doiTuongMacBenh?.tinhIdHienNay}
                />
            </Col>
            <Col xl={3}>
                <OCTAutocomplete
                    menuPlacement="top"
                    lable="Quận/Huyện hiện nay"
                    searchFunction={() => getListHuyenByTinhId(values.doiTuongMacBenh?.tinhIdHienNay)}
                    urlData='data.data'
                    getOptionLabel={(option) => option.tenHuyen}
                    options={[]}
                    searchObject={{}}
                    value={values.doiTuongMacBenh?.huyenIdHienNay}
                    isDisabled={!values.doiTuongMacBenh?.tinhIdHienNay}
                    onChange={(option) => {
                        setValues({
                            ...values,
                            doiTuongMacBenh: {
                                ...values.doiTuongMacBenh,
                                huyenIdHienNay: option?.id,
                                xaIdHienNay: null
                            },
                        })
                    }}
                    dependencies={[values.doiTuongMacBenh?.tinhIdHienNay]}
                    isRequired
                    errors={errors.doiTuongMacBenh?.huyenIdHienNay}
                    touched={touched.doiTuongMacBenh?.huyenIdHienNay}
                />
            </Col>
            <Col xl={3}>
                <OCTAutocomplete
                    menuPlacement="top"
                    lable="Phường/Xã hiện nay"
                    searchFunction={() => getListXaByHuyenId(values.doiTuongMacBenh?.huyenIdHienNay)}
                    urlData='data.data'
                    getOptionLabel={(option) => option.tenXa}
                    options={[]}
                    searchObject={{}}
                    value={values.doiTuongMacBenh?.xaIdHienNay}
                    isDisabled={!values.doiTuongMacBenh?.huyenIdHienNay}
                    onChange={(option) => {
                        setFieldValue("doiTuongMacBenh.xaIdHienNay", option?.xaId)
                    }}
                    dependencies={[values?.doiTuongMacBenh?.huyenIdHienNay]}
                    isRequired
                    errors={errors.doiTuongMacBenh?.xaIdHienNay}
                    touched={touched.doiTuongMacBenh?.xaIdHienNay}
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
                    name='doiTuongMacBenh.tinhIdThuongTru'
                    searchObject={{}}
                    onChange={(option) => {
                        setValues({
                            ...values,
                            doiTuongMacBenh: {
                                ...values.doiTuongMacBenh,
                                tinhIdThuongTru: option?.id,
                                huyenIdThuongTru: null,
                                xaIdThuongTru: null
                            },
                        })
                    }}
                    value={values.doiTuongMacBenh?.tinhIdThuongTru}

                />
            </Col>
            <Col xl={3}>
                <OCTAutocomplete
                    menuPlacement="top"
                    lable="Quận/Huyện thường chú"
                    searchFunction={() => getListHuyenByTinhId(values.doiTuongMacBenh?.tinhIdThuongTru)}
                    urlData='data.data'
                    getOptionLabel={(option) => option.tenHuyen}
                    options={[]}
                    searchObject={{}}
                    value={values.doiTuongMacBenh?.huyenIdThuongTru}
                    isDisabled={!values.doiTuongMacBenh?.tinhIdThuongTru}
                    onChange={(option) => {
                        setValues({
                            ...values,
                            doiTuongMacBenh: {
                                ...values.doiTuongMacBenh,
                                huyenIdThuongTru: option?.id,
                                xaIdThuongTru: null
                            },
                        })
                    }}
                    dependencies={[values.doiTuongMacBenh?.tinhIdThuongTru]}
                />
            </Col>
            <Col xl={3}>
                <OCTAutocomplete
                    menuPlacement="top"
                    lable="Phường/Xã thường trú"
                    searchFunction={() => getListXaByHuyenId(values.doiTuongMacBenh?.huyenIdThuongTru)}
                    urlData='data.data'
                    getOptionLabel={(option) => option.tenXa}
                    options={[]}
                    searchObject={{}}
                    value={values.doiTuongMacBenh?.xaIdThuongTru}
                    isDisabled={!values.doiTuongMacBenh?.huyenIdThuongTru}
                    onChange={(option) => {
                        setFieldValue("doiTuongMacBenh.xaIdThuongTru", option?.xaId)
                    }}
                    dependencies={[values.doiTuongMacBenh?.huyenIdThuongTru]}
                />
            </Col>
        </Row>
    )
}

export default ThongTinHanhChinhTab