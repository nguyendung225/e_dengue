import { OCTAutocomplete, OCTTextValidator, } from '@oceantech/oceantech-ui';
import { useFormikContext } from 'formik';
import { Form } from 'react-bootstrap';
import { Col, Row } from '../../../component/Grid';
import RadioGroup from '../../../component/input-field/RadioGroup';
import { GENDER_OPT } from '../constants/constant';
import { ITruongHopBenh } from '../model/Model';
import { getListDanToc, getListHuyen, getListNgheNghiep, getListTinh, getListXa } from '../../../services';
import Autocomplete from '../../../component/input-field/Autocomplete';
type Props = {
}

const ThongTinHanhChinhTab = (props: Props) => {
    const { values, handleChange, errors, touched, setFieldValue } = useFormikContext<ITruongHopBenh>()

    return (
        <Row >
            <Col xl={12}>
                <div className='fw-bold spaces mt-12'>MÃ SỐ</div>
            </Col>
            <Col xl={3}>
                <OCTTextValidator
                    lable="Họ tên"
                    name="hoTen"
                    isRequired
                    value={values.hoTen}
                    onChange={handleChange}
                    errors={errors?.hoTen}
                    touched={touched?.hoTen}

                />
            </Col>
            <Col xl={2}>
                <OCTTextValidator
                    lable="Ngày sinh"
                    type="date"
                    isRequired
                    name="ngaySinh"
                    value={values.ngaySinh}
                    onChange={handleChange}
                    errors={errors?.ngaySinh}
                    touched={touched?.ngaySinh}
                />

            </Col>
            <Col xl={1}>
                <OCTTextValidator
                    lable="Tuổi"
                    type="text"
                />

            </Col>
            <Col xl={3}>
                <RadioGroup
                    name='gioiTinh'
                    isRequired
                    lable='Giới tính'
                    value={values.gioiTinh}
                    radioItemList={GENDER_OPT}
                    handleChange={handleChange}
                />
            </Col>
            <Col xl={3}>
                <Autocomplete
                    lable="Nghề nghiệp"
                    searchFunction={getListNgheNghiep}
                    getOptionLabel={(option)=>option.tenNghe}
                    options={[]}
                    valueField='id'
                    searchObject={{}}
                    isRequired
                />
            </Col>
            <Col xl={3}>
                <Autocomplete
                    lable="Dân tộc"
                    searchFunction={getListDanToc}
                    getOptionLabel={(option) => option.tenDanToc}
                    options={[]}
                    valueField='id'
                    searchObject={{}}
                    isRequired
                />
            </Col>
            <Col xl={3}>
                <OCTTextValidator
                    lable="CCCD"
                    type="text"
                    isRequired
                    name="cccd"
                    value={values.cccd}
                    onChange={handleChange}
                    errors={errors?.cccd}
                    touched={touched?.cccd}
                    disabled={values.khongKhaiThacDuocCCCD}
                />
                <Form.Check
                    className='mt-2'
                    name='khongKhaiThacDuocCCCD'
                    label='Không khai thác được CCCD'
                    checked={values.khongKhaiThacDuocCCCD}
                    onChange={(event) => {
                        setFieldValue("khongKhaiThacDuocCCCD", event.target.checked)
                        setFieldValue("cccd","")

                    }}

                />
            </Col>
            <Col xl={3}>
                <OCTTextValidator
                    lable="Điện thoại"
                    type="text"
                    isRequired
                    name="dienThoai"
                    value={values.dienThoai}
                    onChange={handleChange}
                    errors={errors?.dienThoai}
                    touched={touched?.dienThoai}
                    disabled={values.khongKhaiThacDuocSoDienThoai}
                />
                <Form.Check
                    className='mt-2'
                    label='Không khai thác được SĐT'
                    name='khongKhaiThacDuocSoDienThoai'
                    checked={values.khongKhaiThacDuocSoDienThoai}
                    onChange={(event)=>{
                        setFieldValue("khongKhaiThacDuocSoDienThoai", event.target.checked)
                        setFieldValue("dienThoai","")

                    }}

                />
            </Col>
            <Col xl={3}>
                <OCTTextValidator
                    lable="Nơi làm việc/Học tập"
                    type="text"
                />
            </Col>
            <Col xs={12}>
                <div className='fw-bold'>Thông tin địa chỉ hiện nay</div>
            </Col>
            <Col xl={3}>
                <OCTTextValidator
                    lable="Địa chỉ hiện nay"
                    type="text"
                    name="diaChiHienNay"
                    onChange={handleChange}
                    isRequired
                    value={values.diaChiHienNay}
                    errors={errors?.diaChiHienNay}
                    touched={touched?.diaChiHienNay}
                />
            </Col>
            <Col xl={3}>
            <Autocomplete
                    lable="Tỉnh/TP hiện nay"
                    searchFunction={getListTinh}
                    getOptionLabel={(option) => option.tenTinh}
                    options={[]}
                    valueField='id'
                    name='tinhTpHienNay'
                    searchObject={{}}
                    onChange={(option)=>{
                        setFieldValue("tinhTpHienNay", option?.id)
                        setFieldValue("phuongXaHienNay", null)
                        setFieldValue("quanHuyenHienNay", null)
                    }}
                    value={values.tinhTpHienNay}
                    isRequired
                />
            </Col>
            <Col xl={3}>
            <Autocomplete
                    lable="Quận/Huyện hiện nay"
                    searchFunction={getListHuyen}
                    getOptionLabel={(option) => option.tenHuyen}
                    options={[]}
                    valueField='id'
                    searchObject={{}}
                    value={values.quanHuyenHienNay}
                    isDisabled={!values.tinhTpHienNay}
                    onChange={(option)=>{
                        setFieldValue("quanHuyenHienNay", option?.id)
                        setFieldValue("phuongXaHienNay", null)
                    }}
                    isRequired
                />
            </Col>
            <Col xl={3}>
                 <Autocomplete
                    lable="Phường/Xã hiện nay"
                    searchFunction={getListXa}
                    getOptionLabel={(option) => option.tenXa}
                    options={[]}
                    valueField='id'
                    searchObject={{}}
                    value={values.phuongXaHienNay}
                    isDisabled={!values.quanHuyenHienNay}
                    onChange={(option)=>{
                        setFieldValue("phuongXaHienNay", option?.id)
                    }}
                    isRequired
                />

            </Col>
            <Col xs={12}>
                <div className='fw-bold'>Thông tin địa chỉ thường trú</div>
            </Col>
            <Col xl={3}>
                <OCTTextValidator
                    lable="Địa chỉ thường trú"
                    type="text"
                />
            </Col>
            <Col xl={3}>
                <OCTAutocomplete
                    lable="Tỉnh/TP thường trú"
                    options={[]}
                />
            </Col>
            <Col xl={3}>
                <OCTAutocomplete
                    lable="Quận/Huyện thường trú"
                    options={[]}
                />
            </Col>
            <Col xl={3}>
                <OCTAutocomplete
                    lable="Phường/Xã thường trú"
                    options={[]}
                />
            </Col>
        </Row>
    )
}

export default ThongTinHanhChinhTab