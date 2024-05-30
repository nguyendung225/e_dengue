import { Form, Formik } from "formik"
import { TabMenu } from "../../../component/tabs/TabMenu"
import { tabTruongHopBenh } from "../constants/constant"
import { initTruongHopBenh } from "../model/Model"

const ThongTinThb = () => {
    return (
        <>
            <Formik
                initialValues={initTruongHopBenh}
                onSubmit={() => { }}
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