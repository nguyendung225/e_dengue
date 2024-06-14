import { OCTAutocomplete, OCTTextValidator } from '@oceantech/oceantech-ui';
import { useFormikContext } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import AppContext from '../../../../AppContext';
import { Col, Row } from '../../../component/Grid';
import RadioGroup from '../../../component/input-field/RadioGroup';
import { getListDanToc, getListHuyenByTinhId, getListNgheNghiep, getListTinh, getListXaByHuyenId } from '../../../services';
import { calculateAge } from '../../../utils/AppFunction';
import { handleChangeHuyen, handleChangeTinh, handleChangeXa, handleSetConfigTable, haveInfomation } from '../../../utils/FunctionUtils';
import { CheckTrungParams, INIT_VALUE_CHECK_TRUNG } from '../../models/TimKiemTruongHopBenhModels';
import { checkTrungTruongHopBenh } from '../../tim-kiem-truong-hop-benh/services/TimKiemThbServices';
import { GENDER_OPT } from '../constants/constant';
import { TruongHopBenh } from '../model/Model';
import { toast } from 'react-toastify';
import DanhSachTHBModal from './DanhSachTHB';
import { formatDataViewTHB } from './../../../utils/FunctionUtils';
import { localStorageItem } from '../../../utils/LocalStorage';
import { KEY_LOCALSTORAGE } from '../../../auth/core/_consts';
import { authRoles } from '../../../auth/authRoles';
type Props = {
    onlyView?: boolean
}

const ThongTinHanhChinhTab = ({ onlyView }: Props) => {
    const {
        values,
        handleChange,
        errors, touched,
        setFieldValue,
        setValues,
    } = useFormikContext<TruongHopBenh>()

    const [dataCheckTrung, setDataCheckTrung] = useState<CheckTrungParams>(INIT_VALUE_CHECK_TRUNG)
    const { setPageLoading } = useContext(AppContext);
    const [dSCheckTrung, setDSCheckTrung] = useState<any[]>([])
    const [openModalDS, setOpenModalDS] = useState(false)
    const [configTable, setConfigTable] = useState<any>({});
    const userData = localStorageItem.get(KEY_LOCALSTORAGE.USER_INFOMATION)
    
    useEffect(() => {
      setDataCheckTrung({
        ...dataCheckTrung,
        TinhId: dataCheckTrung?.TinhId
          ? dataCheckTrung?.TinhId
          : userData?.tinhInfo?.id,
        HuyenId: dataCheckTrung?.HuyenId
          ? dataCheckTrung?.HuyenId
          : userData?.huyenInfo?.id,
        XaId: dataCheckTrung?.XaId
          ? dataCheckTrung?.XaId
          : userData?.xaInfo?.xaId,
      });

      setValues({
        ...values,
        doiTuongMacBenh: {
          ...values?.doiTuongMacBenh,
          tinhHienNay: values?.doiTuongMacBenh?.tinhHienNay
            ? values?.doiTuongMacBenh?.tinhHienNay
            : userData?.tinhInfo,
          huyenHienNay: values?.doiTuongMacBenh?.huyenHienNay
            ? values?.doiTuongMacBenh?.huyenHienNay
            : userData?.huyenInfo,
          xaHienNay: values?.doiTuongMacBenh?.xaHienNay
            ? values?.doiTuongMacBenh?.xaHienNay
            : userData?.xaInfo,
        },
      });
    }, []);

    const handleCheckTrung = async (params: CheckTrungParams) => {
        try {
            setPageLoading(true)
            const { data } = await checkTrungTruongHopBenh(params)
            if (data?.data?.data?.length > 0) {
                const dataTemp = data?.data?.data.map((item: any, index: number) => {
                    return index === 0 ? { ...item, isChecked: true } : item;
                })
                setDSCheckTrung(dataTemp)
                handleSetConfigTable(setConfigTable, data?.data)
                setOpenModalDS(true)
            }
            toast.success('Kiểm tra thông tin trùng thành công')
        } catch (error) {
            console.error('error', error)
        }
        finally {
            setPageLoading(false)
        }
    }

    const handleSetDataCheckTrung = (event: any, name: string) => {
        const newValue = event?.target?.value;
        if (dataCheckTrung[name as keyof CheckTrungParams] !== newValue) {
            setDataCheckTrung({
                ...dataCheckTrung,
                [name]: newValue
            });
        }
    };

    const handleChangeGioiTinh = (event: any) => {
        setFieldValue('doiTuongMacBenh.gioiTinh', event?.target?.value)
        handleSetDataCheckTrung(event, 'GioiTinh')
    }

    const handleChangeXaHienNay = (option: any) => {
        setFieldValue('doiTuongMacBenh.xaHienNay', option)
        setDataCheckTrung({
            ...dataCheckTrung,
            XaId: option?.xaId
        })
    }

    const handleChangeHuyenHienNay = (option: any) => {
        handleChangeHuyen(setValues, 'doiTuongMacBenh', 'huyenHienNay', 'xaHienNay', option)
        setDataCheckTrung({
            ...dataCheckTrung,
            HuyenId: option?.id
        })
    }

    const handleChangeTinhHienNay = (option: any) => {
        handleChangeTinh(setValues, 'doiTuongMacBenh', 'tinhHienNay', 'huyenHienNay', "xaHienNay", option)
        setDataCheckTrung({
            ...dataCheckTrung,
            TinhId: option?.id
        })
    }

    const handleChangeHaveCmnd = (event: any) => {
        haveInfomation(setValues, 'doiTuongMacBenh', 'haveCmnd', 'cmnd', event)
        setDataCheckTrung({
            ...dataCheckTrung,
            HaveCmnd: !event?.target?.checked,
            Cmnd: ""
        })
    }

    const handleSelectTHBTrung = (data: TruongHopBenh) => {
        setValues(formatDataViewTHB(data))
    }

    const checkTrungCondition = (values: TruongHopBenh, dataCheckTrung: CheckTrungParams) => {
        if (values?.doiTuongMacBenh?.doiTuongMacBenhId) {
            return;
        }

        if (dataCheckTrung.Cmnd && dataCheckTrung.HaveCmnd) {
            handleCheckTrung(dataCheckTrung);
            return;

        }

        if (dataCheckTrung.HoTen && dataCheckTrung.NgaySinh && dataCheckTrung.XaId) {
            handleCheckTrung(dataCheckTrung);
            return;
        }
    };

    useEffect(() => {
        checkTrungCondition(values, dataCheckTrung);
    }, [dataCheckTrung]);

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
                    onBlur={(event: any) => handleSetDataCheckTrung(event, 'HoTen')}
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
                    onBlur={(event: any) => handleSetDataCheckTrung(event, 'NgaySinh')}
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
                    handleChange={(event) => { handleChangeGioiTinh(event) }}
                    disabledFields={onlyView ? GENDER_OPT.map(item => item.code) : []}
                />
            </Col>
            <Col xl={3}>
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
                    isDisabled={onlyView}
                />
            </Col>
            <Col xl={3}>
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
                    onBlur={(event: any) => handleSetDataCheckTrung(event, 'Cmnd')}
                />
                <Form.Check
                    disabled={onlyView}
                    className='mt-2'
                    name='doiTuongMacBenh.haveCmnd'
                    label='Không khai thác được CCCD'
                    checked={!values.doiTuongMacBenh?.haveCmnd}
                    onChange={handleChangeHaveCmnd}
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
                        haveInfomation(setValues, "doiTuongMacBenh", "haveDienThoai", "dienThoai", event)
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
                    getOptionLabel={(option) => option?.tenTinh}
                    options={[]}
                    name='doiTuongMacBenh.tinhHienNay'
                    searchObject={{}}
                    onChange={(option) => handleChangeTinhHienNay(option)}
                    isRequired
                    value={values.doiTuongMacBenh?.tinhHienNay}
                    errors={errors.doiTuongMacBenh?.tinhHienNay || ""}
                    touched={touched.doiTuongMacBenh?.tinhHienNay}
                    isDisabled={userData?.username === authRoles.TINH || userData?.username === authRoles.HUYEN || userData?.username === authRoles.XA || onlyView}

                />
            </Col>
            <Col xl={3}>
                <OCTAutocomplete
                    menuPlacement="top"
                    lable="Quận/Huyện hiện nay"
                    searchFunction={() => getListHuyenByTinhId(values.doiTuongMacBenh?.tinhHienNay?.id)}
                    urlData='data.data'
                    getOptionLabel={(option) => option?.tenHuyen}
                    options={[]}
                    searchObject={{}}
                    value={values.doiTuongMacBenh?.huyenHienNay}
                    isDisabled={userData?.username === authRoles.HUYEN || userData?.username === authRoles.XA || !values.doiTuongMacBenh?.tinhHienNay?.id || onlyView}
                    onChange={(option) => handleChangeHuyenHienNay(option)}
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
                    getOptionLabel={(option) => option?.tenXa}
                    options={[]}
                    searchObject={{}}
                    value={values.doiTuongMacBenh?.xaHienNay}
                    isDisabled={userData?.username === authRoles.XA || !values.doiTuongMacBenh?.huyenHienNay?.id || onlyView}
                    onChange={handleChangeXaHienNay}
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
                    isRequired
                    errors={errors.doiTuongMacBenh?.diaChiThuongTru}
                    touched={touched.doiTuongMacBenh?.diaChiThuongTru}
                    disabled={onlyView}
                />
            </Col>
            <Col xl={3}>
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
                        handleChangeTinh(setValues, 'doiTuongMacBenh', 'tinhThuongTru', 'huyenThuongTru', "xaThuongTru", option)
                    }}
                    isRequired
                    isDisabled={onlyView}
                    value={values.doiTuongMacBenh?.tinhThuongTru}
                    errors={errors.doiTuongMacBenh?.tinhThuongTru}
                    touched={touched.doiTuongMacBenh?.tinhThuongTru}
                />
            </Col>
            <Col xl={3}>
                <OCTAutocomplete
                    menuPlacement="top"
                    lable="Quận/Huyện thường chú"
                    searchFunction={() => getListHuyenByTinhId(values.doiTuongMacBenh?.tinhThuongTru?.id)}
                    urlData='data.data'
                    getOptionLabel={(option) => option?.tenHuyen}
                    options={[]}
                    searchObject={{}}
                    value={values.doiTuongMacBenh?.huyenThuongTru}
                    isDisabled={!values.doiTuongMacBenh?.tinhThuongTru || onlyView}
                    onChange={(option) => {
                        handleChangeHuyen(setValues, 'doiTuongMacBenh', 'huyenThuongTru', 'xaThuongTru', option)
                    }}
                    isRequired
                    errors={errors.doiTuongMacBenh?.huyenThuongTru}
                    touched={touched.doiTuongMacBenh?.huyenThuongTru}
                    dependencies={[values.doiTuongMacBenh?.tinhThuongTru]}
                />
            </Col>
            <Col xl={3}>
                <OCTAutocomplete
                    menuPlacement="top"
                    lable="Phường/Xã thường trú"
                    searchFunction={() => getListXaByHuyenId(values.doiTuongMacBenh?.huyenThuongTru?.id)}
                    urlData='data.data'
                    getOptionLabel={(option) => option?.tenXa}
                    options={[]}
                    searchObject={{}}
                    value={values.doiTuongMacBenh?.xaThuongTru}
                    isDisabled={!values.doiTuongMacBenh?.huyenThuongTru || onlyView}
                    onChange={(option) => {
                        handleChangeXa(setValues, 'doiTuongMacBenh', 'xaThuongTru', option)
                    }}
                    isRequired
                    errors={errors.doiTuongMacBenh?.xaThuongTru}
                    touched={touched.doiTuongMacBenh?.xaThuongTru}
                    dependencies={[values.doiTuongMacBenh?.huyenThuongTru]}
                />
            </Col>
            {
                openModalDS &&
                <DanhSachTHBModal
                    data={dSCheckTrung}
                    handleClose={() => setOpenModalDS(false)}
                    configTable={configTable}
                    setSearchObject={setDataCheckTrung}
                    setDataSelected={handleSelectTHBTrung}
                />
            }
        </Row>
    )
}

export default ThongTinHanhChinhTab