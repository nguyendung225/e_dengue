import { OCTKTSVG } from "@oceantech/oceantech-ui"
import { Button, Col, Row } from "react-bootstrap"
import Autocomplete from "../../component/input-field/autocomplete/Autocomplete"
import { useFormikContext } from "formik"
import { useEffect, useState } from "react";
import { ISearchBaoCao } from "../model/model";
import { getListHuyenByTinhId, getListNgayTrongTuan, getListTinh, getListTuanByNam, getListXaByHuyenId } from "../../services";
import LabelRequired from "../../component/LabelRequired";
import { authRoles } from "../../auth/authRoles";
import { localStorageItem } from "../../utils/LocalStorage";
import { KEY_LOCALSTORAGE } from "../../auth/core/_consts";
import moment from "moment";
import { getListYear } from "../../utils/FunctionUtils";
import TextValidator from "../../component/input-field/TextValidator";

const SearchAdvanceForm = () => {
    const { values, handleChange, errors, touched, setFieldValue, setValues } = useFormikContext<ISearchBaoCao>();
    const userData = localStorageItem.get(KEY_LOCALSTORAGE.USER_INFOMATION)
    const [listTuan, setListTuan] = useState<any[]>([]);

    useEffect(() => {
        if (values?.nam) {
            handleGetApiYear(values?.nam as number);
        }
    }, [values?.nam]);

    useEffect(() => {
        if (values?.tuan && values?.nam) {
            getNgayTrongTuan(values?.nam as number, values?.tuan?.value as number);
        }
    }, [values?.tuan])

    const getNgayTrongTuan = async (nam: number, tuan: number | string) => {
        try {
            const { data } = await getListNgayTrongTuan({ nam, tuan });
            setValues((prevValues) => ({
                ...prevValues,
                tuNgay: data?.tungay && moment(data?.tungay, "DD-MM-YYYY").format("YYYY-MM-DD"),
                denNgay: data?.denngay && moment(data?.denngay, "DD-MM-YYYY").format("YYYY-MM-DD"),
            }))
        } catch (err) {
            console.error(err);
        }
    };

    const handleGetApiYear = async (param?: number | null) => {
        try {
            const { data } = await getListTuanByNam({ nam: param });
            setListTuan(data || []);
            if (data?.length) {
                setValues((prevValues) => ({
                    ...prevValues,
                    tuan: data[data?.length - 1]
                }))
            }
        } catch (error) {
            console.error(error)
        }
    }

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
                                !!userData?.tinhId
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
                                setValues({
                                    ...values,
                                    huyenIds: selectedOption,
                                    xaIds: null
                                }) 
                            }}
                            isDisabled={
                                !!userData?.huyenId ||
                                Boolean(values?.tinhIds?.length !== 1)
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
                            onChange={(selectedOption) => {
                                setFieldValue("xaIds", selectedOption)
                            }}
                            isDisabled={
                                !!userData?.xaId ||
                                (values?.huyenIds === null
                                    ? true :
                                    Boolean(values?.huyenIds?.length !== 1))
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
                            urlData='data'
                            getOptionLabel={(option) => option?.text}
                            getOptionValue={(option) => option?.value}
                            options={listTuan || []}
                            name='tuan'
                            searchObject={{}}
                            onChange={(selectedOption) => {
                                setFieldValue("tuan", selectedOption);
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
                        <TextValidator
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
                        <TextValidator
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