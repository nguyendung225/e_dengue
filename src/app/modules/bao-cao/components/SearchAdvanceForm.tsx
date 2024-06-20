import { OCTKTSVG, OCTTextValidator } from "@oceantech/oceantech-ui"
import { Button, Col, Row } from "react-bootstrap"
import Autocomplete from "../../component/input-field/autocomplete/Autocomplete"
import { useFormikContext } from "formik"
import { useEffect, useState } from "react";
import { ISearchBaoCao } from "../model/model";
import { getListHuyenByTinhId, getListNgayTrongTuan, getListTinh, getListTuanTrongNam, getListXaByHuyenId } from "../../services";
import LabelRequired from "../../component/LabelRequired";
import { authRoles } from "../../auth/authRoles";
import { localStorageItem } from "../../utils/LocalStorage";
import { KEY_LOCALSTORAGE } from "../../auth/core/_consts";
import moment from "moment";
import { getListYear } from "../../utils/FunctionUtils";

const SearchAdvanceForm = () => {
    const { values, handleChange, errors, touched, setFieldValue, setValues } = useFormikContext<ISearchBaoCao>();
    const userData = localStorageItem.get(KEY_LOCALSTORAGE.USER_INFOMATION)
    
    useEffect(() => {
        if (userData?.tinhInfo) {
            const newValues = { ...values, tinhIds: [userData.tinhInfo] };

            if (userData?.huyenInfo) {
                newValues.huyenIds = [userData.huyenInfo];

                if (userData?.xaInfo) {
                    newValues.xaIds = [userData.xaInfo];
                } else {
                    getAllXa(userData.huyenInfo.id);
                }
            } else {
                getAllHuyen(userData.tinhInfo.id);
            }

            setValues(newValues);
        } else {
            getAllTinh();
        }
    }, []);

    const getAllXa = async (id: number) => {
        try {
            const { data } = await getListXaByHuyenId(id);
            setValues((prevValues) => ({
                ...prevValues,
                xaIds: data?.data || [],
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const getAllHuyen = async (id: number) => {
        try {
            const { data } = await getListHuyenByTinhId(id);
            setValues((prevValues) => ({
                ...prevValues,
                huyenIds: data?.data || [],
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const getAllTinh = async () => {
        try {
            const {data} = await getListTinh()
            setValues((prevValues) => ({
                ...prevValues,
                tinhIds: data?.data || [],
            }));
        } catch (error) {
            console.error(error)
        }
    }

    const getNgayTrongTuan = async (nam: number, tuan: number) => {
      const { data } = await getListNgayTrongTuan({ nam, tuan });
      setValues({
        ...values,
        tuNgay: data?.tungay && moment(data?.tungay, "DD-MM-YYYY").format("YYYY-MM-DD"),
        denNgay: data?.denngay && moment(data?.denngay, "DD-MM-YYYY").format("YYYY-MM-DD"),
      });
    };

    useEffect(() => {
      if (values?.nam && values?.tuan) {
        getNgayTrongTuan(values?.nam as number, values?.tuan as number);
      }
    }, [values?.nam, values?.tuan]);

    return (
        <div className="spaces mt-15">
            <div className="section-container">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="spaces mb-15 fs-18 fw-bold text-uppercase color-dark-red">
                        Tìm kiếm thông tin
                    </div>
                    <Button
                        className="button-primary"
                        type="submit"
                    >
                        <OCTKTSVG
                            path="/media/svg/icons/search.svg"
                            svgClassName="spaces h-14 w-14 color-white"
                        />
                        Tìm kiếm
                    </Button>
                </div>
                <Row>
                    <Col xs={12} sm={6} md={4} lg={3} className="spaces mt-5">
                        <Autocomplete
                            lable="Tỉnh/T.Phố"
                            searchFunction={getListTinh}
                            multiCheckBox
                            getOptionLabel={(option) => option?.tenTinh}
                            getOptionValue={(option) => option?.id}
                            options={[]}
                            name='tinhIds'
                            searchObject={{}}
                            onChange={(selectedOption) => {
                                setValues({
                                  ...values,
                                  tinhIds: selectedOption,
                                  huyenIds: null,
                                  xaIds: null,
                                });
                            }}
                            isDisabled={
                                userData?.username === authRoles.TINH ||
                                userData?.username === authRoles.HUYEN ||
                                userData?.username === authRoles.XA
                            }
                            
                            value={values?.tinhIds}
                            errors={errors?.tinhIds}
                            touched={touched?.tinhIds}
                            valueSearch={"tenTinh"}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3} className="spaces mt-5">
                        <Autocomplete
                            lable="Quận/Huyện"
                            searchFunction={() =>
                                getListHuyenByTinhId(values?.tinhIds?.[0]?.id as number)
                            }
                            multiCheckBox
                            getOptionLabel={(option) => option?.tenHuyen}
                            getOptionValue={(option) => option?.id}
                            options={[]}
                            name='huyenIds'
                            searchObject={{}}
                            onChange={(selectedOption) => {
                                setValues({...values,huyenIds: selectedOption, xaIds: null}) 
                            }}
                            isDisabled={(userData?.username === authRoles.HUYEN ||
                                userData?.username === authRoles.XA) ||
                                Boolean(values?.tinhIds && values?.tinhIds?.length > 1)
                            }
                            value={values?.huyenIds}
                            errors={errors?.huyenIds}
                            touched={touched?.huyenIds}
                            dependencies={[values?.tinhIds]}
                            valueSearch={"tenHuyen"}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3} className="spaces mt-5">
                        <Autocomplete
                            lable="Xã/Phường"
                            searchFunction={() =>
                                getListXaByHuyenId(values?.huyenIds?.[0].id as number)
                            }
                            multiCheckBox
                            getOptionLabel={(option) => option?.tenXa}
                            getOptionValue={(option) => option?.xaId}
                            options={[]}
                            name='xaIds'
                            searchObject={{}}
                            onChange={(selectedOption) => { setFieldValue("xaIds",selectedOption) }}
                            isDisabled={(userData?.username === authRoles.XA) ||
                                Boolean((values?.tinhIds && values?.tinhIds?.length > 1) ||
                                (values?.huyenIds && values?.huyenIds?.length > 1))
                            }
                            value={values?.xaIds}
                            errors={errors?.xaIds}
                            touched={touched?.xaIds}
                            dependencies={[values?.huyenIds]}
                            valueSearch={"tenXa"}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3} className="spaces mt-5">
                        <Autocomplete
                            lable="Năm"
                            getOptionLabel={(option) => option?.value}
                            getOptionValue={(option) => option?.code}
                            options={getListYear(1955, moment().year())}
                            name='nam'
                            searchObject={{}}
                            onChange={(selectedOption) => {
                                setValues({
                                  ...values,
                                  nam: selectedOption?.code,
                                  tuan: null,
                                });
                            }}
                            value={values?.nam}
                            errors={errors?.nam}
                            touched={touched?.nam}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3} className="spaces mt-5">
                        <Autocomplete
                            lable="Tuần"
                            searchFunction={() =>
                                values?.nam &&
                                getListTuanTrongNam({nam: (values?.nam as number)})
                            }
                            urlData='data'
                            getOptionLabel={(option) => option?.value}
                            options={[]}
                            name='tuan'
                            searchObject={{}}
                            onChange={(selectedOption) => {
                                setFieldValue("tuan", selectedOption?.value as number);
                            }}
                            value={values?.tuan}
                            errors={errors?.tuan}
                            touched={touched?.tuan}
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3} className="spaces mt-5">
                        <LabelRequired
                            label="Từ ngày"
                            className="fw-500"
                        />
                        <OCTTextValidator
                            name="tuNgay"
                            type="date"
                            onChange={handleChange}
                            value={values.tuNgay || ""}
                            errors={errors?.tuNgay}
                            touched={touched?.tuNgay}
                            disabled
                        />
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={3} className="spaces mt-5">
                        <LabelRequired
                            label="Đến ngày"
                            className="fw-500"
                        />
                        <OCTTextValidator
                            name="denNgay"
                            type="date"
                            onChange={handleChange}
                            value={values.denNgay || ""}
                            errors={errors?.denNgay}
                            touched={touched?.denNgay}
                            disabled
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default SearchAdvanceForm