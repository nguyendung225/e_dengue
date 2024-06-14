import moment from "moment";
import { IColumns, IColumnsTotal } from "../TableGrouping";
import { TYPE } from "../../../../utils/Constant";

export const bringChildToParrent = (arr: IColumns[]): any[] => {
    let result: any[] = [...arr];
    arr.forEach((col) => {
        if (col.child) {
            result = result.concat([bringChildToParrent(col.child)]);
        }
    });

    return result;
};

export const convertNumberPrice = (value: number | string | null) => {
    const valueNumber = String(value).replace(/\D/g, '');
    if (!valueNumber) {
        return "";
    }

    const number = Number(valueNumber ? valueNumber : 0);
    const plainNumber = number.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    const valuePrice = plainNumber.substr(0, plainNumber.length - 2)
    return (valuePrice || Number(valuePrice) === 0) ? valuePrice : "";
};

export const formatDateTable = (date: string) => {
    const newDate = new Date(date)
    return date ? moment(newDate).format("DD/MM/YYYY") : null;
};

export const filterChild = (listColumn: IColumns[]): any[] => {
    return listColumn.map((col) => (col.child ? filterChild(col.child) : col));
};

export const convertDataToDataTotal = (data: any[], titleField: string, dataField: string) => {
    //Lọc data và loại bỏ title
    const filterData = (datas: any[]) => {
        let dataFilter: any[] = datas?.reduce((acc, item) => {
            return item?.[titleField] ? [...acc, ...filterData(item?.[dataField])] : [...acc, item];
        }, []);
        return dataFilter;
    };

    //Tính tổng các field
    const calcTotal = (datas: any[]) => {
        const total = datas?.reduce((acc, item) => {
            Object.entries(item).forEach(([key, value]) => {
                if (typeof value === TYPE.NUMBER) {
                    acc[key] = (acc[key] || 0) + value;
                }
            });
            return acc;
        }, {});

        return total;
    };

    return calcTotal(filterData(data).flat(Infinity));
};

export const matchValueForType = (cell: IColumnsTotal | IColumns, data: any) => {
    switch (cell?.type) {
        case TYPE.MONEY:
            return convertNumberPrice(data[cell?.field]);
        case TYPE.NUMBER_FLOAT:
            return data[cell?.field]?.toFixed(cell?.numberFixed || 2);
        case TYPE.DATE:
            return formatDateTable(data[cell?.field]);
        default:
            return data[cell?.field];
    }
};
