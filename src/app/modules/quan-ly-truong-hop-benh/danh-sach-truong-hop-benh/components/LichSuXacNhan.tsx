import { OCTTable } from "@oceantech/oceantech-ui";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LichSuXacNhanColumns } from "../constants/constant";
import { TruongHopBenh } from "../model/Model";
import { getThongTinXacNhan } from "../servives/Services";

const LichSuXacNhan = () => {
    const { values } = useFormikContext<TruongHopBenh>()
    const [data, setdata] = useState([]);
    const id = values?.truongHopBenh?.truongHopBenhId

    const getData = async () => {
        try {
            if (id) {
                const res = await getThongTinXacNhan(id);
                setdata(res?.data?.data?.lichSuXacNhanThbResp)
            }
            else {
                setdata([])
            }
        } catch (error) {
            console.error(error);
            toast.error(error as string);
        }
    }

    useEffect(() => {
        getData();
    }, [id, values?.truongHopBenh?.trangThaiPhanHoi])

    return (
        <div className="spaces mt-15">
            <div className="section-container">
                <OCTTable
                    id="profile"
                    data={data}
                    columns={LichSuXacNhanColumns}
                    fixedColumnsCount={0}
                    notDelete={true}
                    notEdit={true}
                    noToolbar={true}
                    unSelectedAll={true}
                    noPagination
                />
            </div>
        </div>
    )
}

export default LichSuXacNhan