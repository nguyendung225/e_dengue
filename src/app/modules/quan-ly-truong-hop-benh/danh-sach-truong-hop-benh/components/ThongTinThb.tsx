import { TabMenu } from "../../../component/tabs/TabMenu"
import { ThongTinThbTab } from "../constants/constant"

const ThongTinThb = () => {
    return (
        <>
            <TabMenu 
                danhsachTabs={ThongTinThbTab}
            />
        </>
    )
}

export default ThongTinThb