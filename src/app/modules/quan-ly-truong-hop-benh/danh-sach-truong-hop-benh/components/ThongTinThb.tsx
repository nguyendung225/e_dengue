import { Form, Formik } from "formik"
import { TabMenu } from "../../../component/tabs/TabMenu"
import { tabTruongHopBenh } from "../constants/constant"
import { initialTruongHopBenh } from "../model/Model"

const ThongTinThb = () => {
    return (
        <>
            <Formik
                initialValues={initialTruongHopBenh}
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