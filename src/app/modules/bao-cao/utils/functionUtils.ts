import moment from "moment";
import { getListNgayTrongTuan, getListTuanByNam } from "../../services";
import { ISearchBaoCao } from "../model/model";

export const getDayAndWeekByYear = async (year: number, setValues: Function) => {
    try {
        const { data } = await getListTuanByNam({ nam: year });
        if (data?.length) {
            const { data: rangeDate }: any = await getListNgayTrongTuan({ nam: year, tuan: data[data?.length - 1]?.value });
            setValues((prevValues: ISearchBaoCao) => ({
                ...prevValues,
                nam: year,
                tuan: data[data?.length - 1],
                listTuan: data,
                tuNgay: rangeDate.tungay && moment(rangeDate.tungay, "DD-MM-YYYY").format("YYYY-MM-DD"),
                denNgay: rangeDate.denngay && moment(rangeDate.denngay, "DD-MM-YYYY").format("YYYY-MM-DD"),

            }));
        }
    } catch (error) {
        console.error(error)
    }
}