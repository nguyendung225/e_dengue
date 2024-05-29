import { Form, Formik } from "formik"
import { TabMenu } from "../../../component/tabs/TabMenu"
import { tabTruongHopBenh } from "../constants/constant"
import { TruongHopBenh } from "../model/Model"

type IProps = {
    dataRow: TruongHopBenh
}

const ThongTinThb = ({ dataRow }: IProps) => {

    return (
        <>
            <Formik
                initialValues={dataRow}
                onSubmit={() => { }}
                enableReinitialize
            >
                {formikProps => (
                    <Form>
                        <TabMenu
                            danhsachTabs={tabTruongHopBenh}
                            contentTabClassName="pe-none"
                        />
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default ThongTinThb