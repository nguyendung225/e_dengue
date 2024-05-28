import { OCTAutocomplete, OCTTextValidator, } from '@oceantech/oceantech-ui';
import { useFormikContext } from 'formik';
import { Col, Row } from '../../../component/Grid';
import AsyncAutoComplete from '../../../component/input-field/AsyncAutoComplete';
import { getListCoSoDieuTri, getListDonViCongTac } from '../../../services';
import { DIA_DIEM_DIEU_TRI } from '../constants/constant';
import { TruongHopBenh } from '../model/Model';
type Props = {
}

const ThongTinGhiNhanTab = (props: Props) => {
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
                    />
                </Col>
                <Col xs={6}>
                    <AsyncAutoComplete
                        params={{}}
                        required
                        label='Đơn vị công tác'
                        displayField='tenCoSo'
                        service={getListDonViCongTac}
                        handleChange={(value) => setValues({
                            ...values,
                            truongHopBenh: {
                                ...values.truongHopBenh,
                                donViCongTacNbc: value,
                                donViCongTacNbcId: value?.id
                            }
                        })}
                        nameErrorMessage={errors?.truongHopBenh?.donViCongTacNbc as string}
                        value={values.truongHopBenh?.donViCongTacNbc}
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
                        name="truongHopBenh.noiPhatHien"
                        value={values.truongHopBenh?.noiPhatHien}
                        onChange={(option) => setFieldValue("truongHopBenh.noiPhatHien", option?.code)}
                        errors={errors?.truongHopBenh?.noiPhatHien}
                        touched={touched?.truongHopBenh?.noiPhatHien}
                    />
                </Col>
                <Col xl={4}>
                    <AsyncAutoComplete
                        params={{}}
                        required
                        label="Cơ sở điều trị"
                        displayField='tenCoSo'
                        service={getListCoSoDieuTri}
                        handleChange={(value) => setValues({
                            ...values,
                            truongHopBenh: {
                                ...values.truongHopBenh,
                                coSoDieuTri: value,
                                coSoDieuTriId: value?.id
                            }
                        })}
                        nameErrorMessage={errors?.truongHopBenh?.coSoDieuTri as string}
                        value={values.truongHopBenh?.coSoDieuTri}
                    />
                </Col>
                <Col xl={4}>
                    <AsyncAutoComplete
                        params={{}}
                        required
                        displayField='tenCoSo'
                        label="Trạm y tế"
                        service={getListDonViCongTac}
                        handleChange={(value) => setValues({
                            ...values,
                            truongHopBenh: {
                                ...values.truongHopBenh,
                                coSoQuanLy: value,
                                coSoQuanLyId: value?.id
                            }
                        })}
                        nameErrorMessage={errors?.truongHopBenh?.coSoQuanLy as string}
                        value={values.truongHopBenh?.coSoQuanLy}
                    />
                </Col>
            </Row>
        </>
    )
}

export default ThongTinGhiNhanTab