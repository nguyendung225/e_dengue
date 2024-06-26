import { OCTAutocomplete, OCTTextValidator, } from '@oceantech/oceantech-ui';
import { useFormikContext } from 'formik';
import { Col, Row } from '../../../component/Grid';
import AsyncAutoComplete from '../../../component/input-field/AsyncAutoComplete';
import RadioGroup from '../../../component/input-field/RadioGroup';
import { getListCoSoDieuTri, getListCoSoXetNghiem, getListDmCapDoBenh } from '../../../services';
import { CONFIG_BY_CURRENT_STATUS, CONFIG_BY_TYPE_TEST } from '../config/config';
import { CO_SU_DUNG_VAXIN, KHONG_LAY_MAU_XN, KQ_XET_NGHIEM, LAY_MAU_XN, LOAI_XET_NGHIEM, PCLD_XAC_DINH_PHONG_XET_NGHIEM, PHAN_LOAI_CHAN_DOAN, SU_DUNG_VAXIN, TINH_TRANG_HIEN_NAY, YES_NO_OPT } from '../constants/constant';
import { TruongHopBenh } from '../model/Model';
import TextValidator from '../../../component/input-field/TextValidator';

type Props = {
    onlyView?: boolean
}

const ThongTinChanDoanTab = ({ onlyView }: Props) => {
    const { values, handleChange, errors, touched, setFieldValue, setValues } = useFormikContext<TruongHopBenh>()

    const handleChangePhanLoaiChanDoan = (option: any) => {
        const newValue: TruongHopBenh = {
            ...values, truongHopBenh: {
                ...values.truongHopBenh,
                phanLoaiChanDoan: option?.code,
                layMauXetNghiem: option?.code === PCLD_XAC_DINH_PHONG_XET_NGHIEM ? LAY_MAU_XN : values?.truongHopBenh?.layMauXetNghiem
            }
        }
        setValues(newValue)
    }

    const handleChangeTinhTrangHienNay = (option: any) => {
        const newValue: TruongHopBenh = {
            ...values, truongHopBenh: {
                ...values.truongHopBenh,
                tinhTrangHienNay: option?.code,
                chanDoanRaVien: "",
                benhVienChuyenToiId: null,
                benhVienChuyenToi: null,
                tinhTrangKhac: null,
                ngayRaVien: null
            }
        }
        setValues(newValue)
    }

    const handleChangeLoaiXetNghiem = (option: any) => {
        const newValue: TruongHopBenh = {
            ...values, truongHopBenh: {
                ...values.truongHopBenh,
                loaiXetNghiem: option?.code,
                dinhLoaiXetNghiemKhac: "",
                loaiXetNghiemKhac: "",
            }
        }
        setValues(newValue)
    }

    const handleChangeLayMauXN = (event: any) => {
        const newValue: TruongHopBenh = {
            ...values, truongHopBenh: {
                ...values.truongHopBenh,
                layMauXetNghiem: event?.target?.value,
                loaiXetNghiem: null,
                dinhLoaiXetNghiemKhac: "",
                loaiXetNghiemKhac: "",
                ketQuaXetNghiem: null,
                ngayThucHienXn: null,
                ngayTraKetQuaXn: null,
                donViXetNghiem: null,
                donViXetNghiemObject: null,
            }
        }
        setValues(newValue)
    }

    const configByStatus = CONFIG_BY_CURRENT_STATUS[values?.truongHopBenh?.tinhTrangHienNay as any]
    const configByTypeTest = CONFIG_BY_TYPE_TEST[values?.truongHopBenh?.loaiXetNghiem as any]
    const disabledFieldLayMauXN = values?.truongHopBenh?.phanLoaiChanDoan === PCLD_XAC_DINH_PHONG_XET_NGHIEM ? [KHONG_LAY_MAU_XN] : []

    return (
        <>
            <Row className='pt-3'>
                <Col xl={6}>
                    <OCTAutocomplete
                        lable="Phân độ lâm sàng/ Phân loại thể bệnh"
                        searchFunction={getListDmCapDoBenh}
                        urlData='data.data'
                        getOptionLabel={(option) => option?.tenCapDo}
                        options={[]}
                        value={values.truongHopBenh?.capDoBenh}
                        onChange={(option) => setFieldValue("truongHopBenh.capDoBenh", option)}
                        searchObject={{}}
                        isDisabled={onlyView}
                    />
                </Col>
                <Col xl={6}>
                    <OCTAutocomplete
                        lable="Phân độ lâm sàng/ Phân loại thể bệnh ra viện"
                        searchFunction={getListDmCapDoBenh}
                        urlData='data.data'
                        getOptionLabel={(option) => option?.tenCapDo}
                        options={[]}
                        value={values.truongHopBenh?.capDoBenhRaVien}
                        onChange={(option) => setFieldValue("truongHopBenh.capDoBenhRaVien", option)}
                        searchObject={{}}
                        isDisabled={onlyView}
                    />
                </Col>
            </Row>
            <Row >
                <Col xl={2}>
                    <OCTAutocomplete
                        lable="Tình trạng hiện tại"
                        options={TINH_TRANG_HIEN_NAY}
                        valueSearch={"code"}
                        value={values.truongHopBenh?.tinhTrangHienNay}
                        onChange={handleChangeTinhTrangHienNay}
                        isRequired
                        errors={errors.truongHopBenh?.tinhTrangHienNay}
                        touched={touched.truongHopBenh?.tinhTrangHienNay}
                        isDisabled={onlyView}
                    />
                </Col>
                <Col xl={2}>
                    <TextValidator
                        lable="Ngày khởi phát"
                        type="date"
                        name="truongHopBenh.ngayKhoiPhat"
                        value={values.truongHopBenh?.ngayKhoiPhat}
                        onChange={handleChange}
                        isRequired={configByStatus?.ngayKhoiPhat?.require}
                        errors={errors?.truongHopBenh?.ngayKhoiPhat}
                        touched={touched?.truongHopBenh?.ngayKhoiPhat}
                        disabled={onlyView}
                    />
                </Col>
                <Col xl={2}>
                    <TextValidator
                        lable="Ngày N.Viện/khám"
                        type="date"
                        isRequired
                        name="truongHopBenh.ngayNhapVien"
                        value={values.truongHopBenh?.ngayNhapVien}
                        onChange={handleChange}
                        errors={errors?.truongHopBenh?.ngayNhapVien}
                        touched={touched?.truongHopBenh?.ngayNhapVien}
                        disabled={onlyView}
                    />
                </Col>
                <Col xl={3}>
                    <TextValidator
                        lable="Ngày ra viện/chuyển viện/tử vong"
                        type="date"
                        name="truongHopBenh.ngayRaVien"
                        onChange={handleChange}
                        value={values.truongHopBenh?.ngayRaVien || ""}
                        disabled={configByStatus?.ngayRaVienChuyenVienTuVong?.disabled || onlyView}
                        isRequired={configByStatus?.ngayRaVienChuyenVienTuVong?.require}
                        errors={errors?.truongHopBenh?.ngayRaVien}
                        touched={touched?.truongHopBenh?.ngayRaVien}        
                    />
                </Col>
                <Col xl={3}>
                    {configByStatus?.chanDoanRaVien && (
                        <OCTTextValidator
                            lable="Chẩn đoán ra viện"
                            type="text"
                            isRequired
                            name="truongHopBenh.chanDoanRaVien"
                            value={values.truongHopBenh?.chanDoanRaVien}
                            onChange={handleChange}
                            errors={errors?.truongHopBenh?.chanDoanRaVien}
                            touched={touched?.truongHopBenh?.chanDoanRaVien}
                            disabled={onlyView}
                        />
                    )}
                    {configByStatus?.chuyenToi && (
                        <AsyncAutoComplete
                            params={{}}
                            required
                            displayField='tenCoSo'
                            label="Chuyển tới"
                            service={getListCoSoDieuTri}
                            handleChange={(value) => setFieldValue('truongHopBenh.benhVienChuyenToi', value)}
                            nameErrorMessage={errors?.truongHopBenh?.benhVienChuyenToi as string}
                            touched={touched?.truongHopBenh?.benhVienChuyenToi}
                            value={values.truongHopBenh?.benhVienChuyenToi}
                            isDisabled={onlyView}
                        />
                    )}
                    {configByStatus?.tinhTrangKhac && (
                        <OCTTextValidator
                            lable="Tình trạng khác"
                            type="text"
                            isRequired
                            name="truongHopBenh.tinhTrangKhac"
                            value={values.truongHopBenh?.tinhTrangKhac}
                            onChange={handleChange}
                            errors={errors?.truongHopBenh?.tinhTrangKhac}
                            touched={touched?.truongHopBenh?.tinhTrangKhac}
                            disabled={onlyView}
                        />
                    )}
                </Col>
                <Col xl={3}>
                    <OCTAutocomplete
                        lable="Phân loại chẩn đoán"
                        options={PHAN_LOAI_CHAN_DOAN}
                        valueSearch={"code"}
                        value={values?.truongHopBenh?.phanLoaiChanDoan}
                        onChange={handleChangePhanLoaiChanDoan}
                        isRequired
                        errors={errors?.truongHopBenh?.phanLoaiChanDoan}
                        touched={touched?.truongHopBenh?.phanLoaiChanDoan}
                        isDisabled={onlyView}
                    />
                </Col>
                <Col xl={3}>
                    <RadioGroup
                        name='truongHopBenh.layMauXetNghiem'
                        lable='Lấy mẫu xét nghiệm chẩn đoán'
                        value={values?.truongHopBenh?.layMauXetNghiem}
                        radioItemList={YES_NO_OPT}
                        handleChange={handleChangeLayMauXN}
                        disabledFields={onlyView ? YES_NO_OPT.map(item => item.code) : disabledFieldLayMauXN}
                    />
                </Col>
                <Col xl={3}>
                    <OCTAutocomplete
                        lable="Thông tin về tiêm, uống vắc xin"
                        options={SU_DUNG_VAXIN}
                        valueSearch={"code"}
                        value={values?.truongHopBenh?.suDungVacXin}
                        onChange={(option) => {
                            setFieldValue("truongHopBenh.suDungVacXin", option?.code)
                            setFieldValue("truongHopBenh.soLanSuDung", null)
                        }}
                        isDisabled={onlyView}
                    />
                </Col>
                <Col xl={3} >
                    {
                        values?.truongHopBenh?.suDungVacXin === CO_SU_DUNG_VAXIN && (
                            <OCTTextValidator
                                lable="Số lần tiêm, uống"
                                type="number"
                                name="truongHopBenh.soLanSuDung"
                                value={values?.truongHopBenh?.soLanSuDung}
                                onChange={handleChange}
                                isRequired
                                errors={errors?.truongHopBenh?.soLanSuDung}
                                touched={touched?.truongHopBenh?.soLanSuDung}
                                disabled={onlyView}
                            />
                        )
                    }
                </Col >
                {values?.truongHopBenh?.layMauXetNghiem === LAY_MAU_XN && (<>
                    <Col xl={3}>
                        <OCTAutocomplete
                            lable="Loại xét nghiệm"
                            valueSearch={"code"}
                            options={LOAI_XET_NGHIEM}
                            value={values?.truongHopBenh?.loaiXetNghiem}
                            onChange={handleChangeLoaiXetNghiem}
                            isDisabled={onlyView}
                        />
                    </Col>
                    <Col xl={3}>
                        {configByTypeTest?.dinhLoai && (
                            <OCTTextValidator
                                lable="Đinh loại"
                                type="text"
                                name="truongHopBenh.dinhLoaiXetNghiemKhac"
                                value={values?.truongHopBenh?.dinhLoaiXetNghiemKhac}
                                onChange={handleChange}
                                disabled={onlyView}
                            />
                        )}
                    </Col>
                    <Col xl={3}>
                        {configByTypeTest?.tenXetNghiemKhac && (
                            <OCTTextValidator
                                lable="Tên xét nghiệm"
                                type="text"
                                isRequired
                                name="truongHopBenh.loaiXetNghiemKhac"
                                value={values?.truongHopBenh?.loaiXetNghiemKhac}
                                onChange={handleChange}
                                errors={errors?.truongHopBenh?.loaiXetNghiemKhac}
                                touched={touched?.truongHopBenh?.loaiXetNghiemKhac}
                                disabled={onlyView}
                            />
                        )}
                    </Col>
                    <Col xl={3} />
                    <Col xl={3}>
                        <OCTAutocomplete
                            lable="Kết quả xét nghiệm"
                            options={KQ_XET_NGHIEM}
                            valueSearch={"code"}
                            value={values?.truongHopBenh?.ketQuaXetNghiem}
                            onChange={(option) => setFieldValue("truongHopBenh.ketQuaXetNghiem", option?.code)}
                            isDisabled={onlyView}
                        />
                    </Col>
                    <Col xl={3}>
                        <TextValidator
                            lable="Ngày lấy mẫu"
                            type="date"
                            name="truongHopBenh.ngayThucHienXn"
                            isRequired
                            value={values?.truongHopBenh?.ngayThucHienXn}
                            onChange={handleChange}
                            errors={errors?.truongHopBenh?.ngayThucHienXn}
                            touched={touched?.truongHopBenh?.ngayThucHienXn}
                            disabled={onlyView}

                        />
                    </Col>
                    <Col xl={3}>
                        <TextValidator
                            lable="Ngày trả kết quả"
                            type="date"
                            name="truongHopBenh.ngayTraKetQuaXn"
                            value={values?.truongHopBenh?.ngayTraKetQuaXn}
                            onChange={handleChange}
                            errors={errors?.truongHopBenh?.ngayTraKetQuaXn}
                            touched={touched?.truongHopBenh?.ngayTraKetQuaXn}
                            disabled={onlyView} 
                        />
                    </Col>
                    <Col xl={3}>
                        <AsyncAutoComplete
                        params={{}}
                        displayField='tenCoSo'
                        label="Đơn vị xét nghiệm"
                        service={getListCoSoXetNghiem}
                        handleChange={(value) => setFieldValue("truongHopBenh.donViXetNghiemObject", value)}
                        nameErrorMessage={errors?.truongHopBenh?.donViXetNghiemObject as string}
                        touched={touched?.truongHopBenh?.donViXetNghiemObject}
                        value={values.truongHopBenh?.donViXetNghiemObject}
                        isDisabled={onlyView}
                    />
                    </Col>
                </>)}
                <Col xl={6}>
                    <OCTTextValidator
                        lable="Chẩn đoán bệnh kèm theo"
                        type="text"
                        value={values?.truongHopBenh?.benhChanDoanPhu}
                        name={"truongHopBenh.benhChanDoanPhu"}
                        onChange={handleChange}
                        disabled={onlyView}
                    />
                </Col>
                <Col xl={6}>
                    <OCTTextValidator
                        lable="Chẩn đoán biến chứng"
                        type="text"
                        value={values?.truongHopBenh?.chanDoanBienChung}
                        name={"truongHopBenh.chanDoanBienChung"}
                        onChange={handleChange}
                        disabled={onlyView}
                    />
                </Col>
                <Col xl={6}>
                    <OCTTextValidator
                        lable="Tiền sử dịch tễ"
                        type="text"
                        as="textarea"
                        rows={2}
                        value={values?.truongHopBenh?.tienSuDichTe}
                        name={"truongHopBenh.tienSuDichTe"}
                        onChange={handleChange}
                        disabled={onlyView}

                    />
                </Col>
                <Col xl={6}>
                    <OCTTextValidator
                        lable="Ghi chú"
                        type="text"
                        as="textarea"
                        rows={2}
                        value={values?.truongHopBenh?.ghiChu}
                        name={"truongHopBenh.ghiChu"}
                        onChange={handleChange}
                        disabled={onlyView}
                    />
                </Col>
            </Row>
        </>
    )
}

export default ThongTinChanDoanTab