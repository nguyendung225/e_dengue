import { OCTTable } from "@oceantech/oceantech-ui";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TienSuBenhColumns } from "../constants/constant";
import { TruongHopBenh } from "../model/Model";
import { getThongTinTienSuBenh } from "../servives/Services";

const TienSuBenh = () => {
    const { values } = useFormikContext<TruongHopBenh>()
    const [data, setdata] = useState([]);
    const id = values?.truongHopBenh?.truongHopBenhId

    const getData = async () => {
        try {
            if (id) {
                const res = await getThongTinTienSuBenh(id);
                setdata(res?.data?.data?.tienSuBenhThbResps)
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
                    columns={TienSuBenhColumns}
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

export default TienSuBenh