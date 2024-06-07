import { OCTAutocomplete, OCTTextValidator, } from '@oceantech/oceantech-ui';
import { useFormikContext } from 'formik';
import { Col, Row } from '../../../component/Grid';
import AsyncAutoComplete from '../../../component/input-field/AsyncAutoComplete';
import { getListCoSoDieuTri, getListDonViCongTac } from '../../../services';
import { DIA_DIEM_DIEU_TRI } from '../constants/constant';
import { TruongHopBenh } from '../model/Model';

type Props = {
    onlyView?: boolean
}

const ThongTinGhiNhanTab = ({ onlyView }: Props) => {
    const { values, handleChange, errors, touched, setFieldValue, setValues } = useFormikContext<TruongHopBenh>()

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
                        name="truongHopBenh.tenNguoiBaoCao"
                        value={values.truongHopBenh?.tenNguoiBaoCao}
                        onChange={handleChange}
                        errors={errors?.truongHopBenh?.tenNguoiBaoCao}
                        touched={touched?.truongHopBenh?.tenNguoiBaoCao}
                        disabled={onlyView}
                    />
                </Col>
                <Col xs={6}>
                    <OCTTextValidator
                        lable="Điện thoại"
                        type="text"
                        isRequired
                        name="truongHopBenh.dienThoaiNguoiBaoCao"
                        value={values.truongHopBenh?.dienThoaiNguoiBaoCao}
                        onChange={handleChange}
                        errors={errors?.truongHopBenh?.dienThoaiNguoiBaoCao}
                        touched={touched?.truongHopBenh?.dienThoaiNguoiBaoCao}
                        disabled={onlyView}
                    />
                </Col>
                <Col xs={6}>
                    <OCTTextValidator
                        lable="Email"
                        type="text"
                        isRequired
                        name="truongHopBenh.emailNguoiBaoCao"
                        value={values.truongHopBenh?.emailNguoiBaoCao}
                        onChange={handleChange}
                        errors={errors?.truongHopBenh?.emailNguoiBaoCao}
                        touched={touched?.truongHopBenh?.emailNguoiBaoCao}
                        disabled={onlyView}
                    />
                </Col>
                <Col xs={6}>
                    <AsyncAutoComplete
                        params={{}}
                        required
                        label='Đơn vị công tác'
                        displayField='tenCoSo'
                        service={getListDonViCongTac}
                        handleChange={(value) => setFieldValue("truongHopBenh.donViCongTacNbc", value)}
                        nameErrorMessage={errors?.truongHopBenh?.donViCongTacNbc as string}
                        value={values.truongHopBenh?.donViCongTacNbc}
                        touched={touched?.truongHopBenh?.donViCongTacNbc}
                        isDisabled={onlyView}
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
                        options={DIA_DIEM_DIEU_TRI}
                        isRequired
                        valueSearch="code"
                        name="truongHopBenh.noiPhatHien"
                        value={values.truongHopBenh?.noiPhatHien}
                        onChange={(option) => setFieldValue("truongHopBenh.noiPhatHien", option?.code)}
                        errors={errors?.truongHopBenh?.noiPhatHien}
                        touched={touched?.truongHopBenh?.noiPhatHien}
                        isDisabled={onlyView}
                    />
                </Col>
                <Col xl={4}>
                    <AsyncAutoComplete
                        params={{}}
                        required
                        label="Cơ sở điều trị"
                        displayField='tenCoSo'
                        service={getListCoSoDieuTri}
                        handleChange={(value) =>setFieldValue("truongHopBenh.coSoDieuTri", value)}
                        nameErrorMessage={errors?.truongHopBenh?.coSoDieuTri as string}
                        touched={touched?.truongHopBenh?.coSoDieuTri}
                        value={values.truongHopBenh?.coSoDieuTri}
                        isDisabled={onlyView}
                    />
                </Col>
                <Col xl={4}>
                    <AsyncAutoComplete
                        params={{}}
                        required
                        displayField='tenCoSo'
                        label="Trạm y tế"
                        service={getListCoSoDieuTri}
                        handleChange={(value) => setFieldValue("truongHopBenh.coSoQuanLy", value)}
                        nameErrorMessage={errors?.truongHopBenh?.coSoQuanLy as string}
                        touched={touched?.truongHopBenh?.coSoQuanLy}
                        value={values.truongHopBenh?.coSoQuanLy}
                        isDisabled={onlyView}
                    />
                </Col>
            </Row>
        </>
    )
}

export default ThongTinGhiNhanTab