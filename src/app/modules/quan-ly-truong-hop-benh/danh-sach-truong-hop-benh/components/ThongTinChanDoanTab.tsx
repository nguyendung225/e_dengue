import { OCTAutocomplete, OCTTextValidator, } from '@oceantech/oceantech-ui';
import { useFormikContext } from 'formik';
import { Col, Row } from '../../../component/Grid';
import RadioGroup from '../../../component/input-field/RadioGroup';
import { YES_NO_OPT } from '../constants/constant';
import { ITruongHopBenh } from '../model/Model';
type Props = {
}

const ThongTinChanDoanTab = (props: Props) => {
    const { values, handleChange, errors, touched } = useFormikContext<ITruongHopBenh>()

    return (
        <>
            <Row className='spaces mt-24'>
                <Col xl={4}>
                    <OCTAutocomplete
                        lable="Phân độ lâm sàng/ Phân loại thể bệnh"

                        options={[]}
                        isRequired
                    />
                </Col>
            </Row>
            <Row >
                <Col xl={2}>
                    <OCTAutocomplete
                        lable="Tình trạng hiện tại"
                        options={[]}
                    />
                </Col>
                <Col xl={2}>
                    <OCTTextValidator
                        lable="Ngày khởi phát"
                        type="date"
                    />
                </Col>
                <Col xl={2}>
                    <OCTTextValidator
                        lable="Ngày nhập viện/khám"
                        type="date"
                        isRequired
                        name="ngayNhapVienKham"
                        values={values.ngayNhapVienKham}
                        onChange={handleChange}
                        errors={errors?.ngayNhapVienKham}
                        touched={touched?.ngayNhapVienKham}
                    />
                </Col>
                <Col xl={3}>
                    <OCTTextValidator
                        lable="Ngày ra viện/chuyển viện/tử vong"
                        type="date"
                    />
                </Col>
                <Col xl={3} />
                <Col xl={3}>
                    <OCTAutocomplete
                        lable="Phân loại chẩn đoán"
                        options={[]}
                    />
                </Col>
                <Col xl={3}>
                    <RadioGroup
                        name='layMauXetNghiemChanDoan'
                        lable='Lấy mẫu xét nghiệm chẩn đoán'
                        value={values?.layMauXetNghiemChanDoan}
                        radioItemList={YES_NO_OPT}
                        handleChange={handleChange}
                    />
                </Col>
                {values?.layMauXetNghiemChanDoan === YES_NO_OPT[0].code && (<>
                    <Col xl={3}>
                        <OCTAutocomplete
                            lable="Thông tin về tiêm, uống vắc xin"
                            options={[]}
                            isRequired
                        />
                    </Col>
                    <Col xl={3} />
                    <Col xl={3}>
                        <OCTAutocomplete
                            lable="Loại xét nghiệm"
                            options={[]}
                        />
                    </Col>
                    <Col xl={3}>
                        <OCTTextValidator
                            lable="Tên xét nghiệm"
                            type="text"
                            isRequired
                            name="tenXetNghiem"
                            values={values.tenXetNghiem}
                            onChange={handleChange}
                            errors={errors?.tenXetNghiem}
                            touched={touched?.tenXetNghiem}
                        />
                    </Col>
                    <Col xl={3}>
                        <OCTTextValidator
                            lable="Đinh loại"
                            type="text"
                        />
                    </Col>
                    <Col xl={3} />
                    <Col xl={3}>
                        <OCTAutocomplete
                            lable="Kết quả xét nghiệm"
                            options={[]}
                        />
                    </Col>
                    <Col xl={3}>
                        <OCTTextValidator
                            lable="Ngày lấy mẫu"
                            type="date"
                            name="ngayLayMau"
                            isRequired
                            values={values.ngayLayMau}
                            onChange={handleChange}
                            errors={errors?.ngayLayMau}
                            touched={touched?.ngayLayMau}
                        />
                    </Col>
                    <Col xl={3}>
                        <OCTTextValidator
                            lable="Ngày trả kết quả"
                            type="date"
                        />
                    </Col>
                    <Col xl={3}>
                        <OCTTextValidator
                            lable="Đơn vị xét nghiệm"
                            type="date"
                        />
                    </Col>
                </>)}
                <Col xl={6}>
                    <OCTTextValidator
                        lable="Chẩn đoán bệnh kèm theo"
                        type="text"
                    />
                </Col>
                <Col xl={6}>
                    <OCTTextValidator
                        lable="Chẩn đoán biến chứng"
                        type="text"
                    />
                </Col>
                <Col xl={6}>
                    <OCTTextValidator
                        lable="Tiền sử dịch tễ"
                        type="text"
                        as="textArea"
                        rows={2}
                    />
                </Col>
                <Col xl={6}>
                    <OCTTextValidator
                        lable="Ghi chú"
                        type="text"
                        as="textArea"
                        rows={2}
                    />
                </Col>
            </Row>
        </>
    )
}

export default ThongTinChanDoanTab