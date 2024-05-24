import { OCTAutocomplete, OCTTextValidator, } from '@oceantech/oceantech-ui';
import { useFormikContext } from 'formik';
import { Form } from 'react-bootstrap';
import { Col, Row } from '../../../component/Grid';
import RadioGroup from '../../../component/input-field/RadioGroup';
import { GENDER_OPT } from '../constants/constant';
import { ITruongHopBenh } from '../model/Model';
type Props = {
}

const ThongTinHanhChinhTab = (props: Props) => {
    const { values, handleChange, errors, touched } = useFormikContext<ITruongHopBenh>()

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
                    values={values.hoTen}
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
                    values={values.ngaySinh}
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
                <OCTAutocomplete
                    lable="Nghề nghiệp"
                    options={[]}
                    isRequired
                />
            </Col>
            <Col xl={3}>
                <OCTTextValidator
                    lable="Dân tộc"
                    type="text"
                    isRequired
                    name='danToc'
                    values={values.danToc}
                    onChange={handleChange}
                    errors={errors?.danToc}
                    touched={touched?.danToc}
                />
            </Col>
            <Col xl={3}>
                <OCTTextValidator
                    lable="CCCD"
                    type="text"
                    isRequired
                    name="cccd"
                    values={values.cccd}
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
                    onChange={handleChange}

                />
            </Col>
            <Col xl={3}>
                <OCTTextValidator
                    lable="Điện thoại"
                    type="text"
                    isRequired
                    name="dienThoai"
                    values={values.dienThoai}
                    onChange={handleChange}
                    errors={errors?.dienThoai}
                    touched={touched?.dienThoai}
                    disabled={values.khongKhaiThacDuocSoDienThoai}
                />
                <Form.Check
                    className='mt-2'
                    label='Không khai thác được số điện thoại'
                    name='khongKhaiThacDuocSoDienThoai'
                    checked={values.khongKhaiThacDuocSoDienThoai}
                    onChange={handleChange}

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
                    values={values.diaChiHienNay}
                    errors={errors?.diaChiHienNay}
                    touched={touched?.diaChiHienNay}
                />
            </Col>
            <Col xl={3}>
                <OCTAutocomplete
                    lable="Tỉnh/TP hiện nay"
                    options={[]}
                    isRequired
                />
            </Col>
            <Col xl={3}>
                <OCTAutocomplete
                    lable="Quận/Huyện hiện nay"
                    options={[]}
                    isRequired
                />
            </Col>
            <Col xl={3}>
                <OCTAutocomplete
                    lable="Phường/Xã hiện nay"
                    options={[]}
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