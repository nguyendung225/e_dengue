import { OCTTable } from "@oceantech/oceantech-ui";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LichSuTheoDoiColumns } from "../constants/constant";
import { TruongHopBenh } from "../model/Model";
import { getThongTinTheoDoi } from "../servives/Services";

const LichSuTheoDoi = () => {
    const { values } = useFormikContext<TruongHopBenh>()
    const [data, setdata] = useState([]);
    const id = values?.truongHopBenh?.truongHopBenhId

    const getData = async () => {
        try {
            if (id) {
                const res = await getThongTinTheoDoi(id);
                setdata(res?.data?.data?.thbLichSuTheoDoi)
            }
        } catch (error) {
            console.error(error);
            toast.error(error as string);
        }
    }

    useEffect(() => {
        getData();
    }, [id])

    return (
        <div className="spaces mt-15">
            <div className="section-container">
                <OCTTable
                    id="profile"
                    data={data}
                    columns={LichSuTheoDoiColumns}
                    fixedColumnsCount={0}
                    notDelete={true}
                    notEdit={true}
                    noToolbar={true}
                    unSelectedAll={true}
                />
            </div>
        </div>
    )
}

export default LichSuTheoDoi