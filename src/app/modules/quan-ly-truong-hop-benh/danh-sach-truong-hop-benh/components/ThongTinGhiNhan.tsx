import { OCTAutocomplete, OCTTextValidator, } from '@oceantech/oceantech-ui';
import { useFormikContext } from 'formik';
import { Col, Row } from '../../../component/Grid';
import { ITruongHopBenh } from '../model/Model';
type Props = {
}

const ThongTinGhiNhanTab = (props: Props) => {
    const { values, handleChange, errors, touched } = useFormikContext<ITruongHopBenh>()

    return (
        <>
            <Row >
                <Col xl={12}>
                    <div className='fw-bold spaces mt-24'>Thông tin người báo cáo</div>
                </Col>
                <Col xs={6}>
                    <OCTTextValidator
                        lable="Tên người báo cáo"
                        type="text"
                        isRequired
                        name="tenNguoiBaoCao"
                        values={values.tenNguoiBaoCao}
                        onChange={handleChange}
                        errors={errors?.tenNguoiBaoCao}
                        touched={touched?.tenNguoiBaoCao}
                    />
                </Col>
                <Col xs={6}>
                    <OCTTextValidator
                        lable="Điện thoại"
                        type="text"
                        isRequired
                    />
                </Col>
                <Col xs={6}>
                    <OCTTextValidator
                        lable="Email"
                        type="text"
                        isRequired
                    />
                </Col>
                <Col xs={6}>
                    <OCTTextValidator
                        lable="Đơn vị công tác"
                        type="text"
                        isRequired
                    />
                </Col>
                <Col xl={6}>
                    <div className='fw-bold spaces'>Cơ sở điều trị</div>
                </Col>
                <Col xl={6}>
                    <div className='fw-bold spaces'>Xã/Phường quản lý</div>
                </Col>
                <Col xl={2}>
                    <OCTAutocomplete
                        lable="Địa điểm"
                        options={[]}
                        isRequired
                    />
                </Col>
                <Col xl={4}>
                    <OCTAutocomplete
                        lable="Cơ sở điều trị"
                        options={[]}
                        isRequired
                    />
                </Col>
                <Col xl={4}>
                    <OCTAutocomplete
                        lable="Trạm y tế"
                        options={[]}
                        isRequired
                    />
                </Col>
            </Row></>

    )
}

export default ThongTinGhiNhanTab