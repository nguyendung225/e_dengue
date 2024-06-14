import { useCallback, useEffect, useState } from "react";
import { IColumns } from "../TableGrouping";
import { bringChildToParrent, filterChild } from "../utils/tableGroupingUtils";

interface Iprops {
    columns: IColumns[];
    tableId: string;
    data: any[];
}

function TableHeader(props: Iprops) {
    const { columns, tableId, data } = props;

    const [rowHeader, setRowHeader] = useState<IColumns[][]>([]);

    //Tách các phần tử của mảng theo độ sâu của mảng
    const extractElementsByDepth = (array: any[], level: number = 0, target: any[] = []) => {
        array.forEach((element) => {
            if (Array.isArray(element)) {
                extractElementsByDepth(element, level + 1, target);
            } else {
                target[level] ? target[level].push(element) : (target[level] = [element]);
            }
        });

        return target;
    };

    //Kiểm tra độ sâu của mảng (arr là mảng trong mảng, không hỗ trợ mảng trong object)
    const countArrayDeep = (arr: any[]): number => {
        if (!Array.isArray(arr)) return 0;

        let maxDeep = 1;

        arr.forEach(item => {
            if (Array.isArray(item)) {
                const deep = 1 + countArrayDeep(item);
                maxDeep = Math.max(maxDeep, deep);
            }
        })

        return maxDeep;
    }

    useEffect(() => {
        setRowHeader(extractElementsByDepth(bringChildToParrent(columns)));
    }, [columns]);

    const calculateColSpan = (column: IColumns) => {
        return column?.child ? filterChild(column.child).flat(Infinity).length : 1;
    };

    const calculateRowSpan = (column: IColumns, level: number) => {
        let maxRowSpan = countArrayDeep(filterChild(columns));
        return column?.child ? 1 : maxRowSpan - level;
    };

    const handleRenderStickyColumns = useCallback(() => {
        let stickyColumns = document.querySelectorAll(`.column-header-group-sticky-${tableId}`);

        Array.from(stickyColumns).reduce((acc: number, col: Element) => {
            let colElement = col as HTMLElement;
            colElement.style.left = acc + "px";
            return acc + colElement.offsetWidth;
        }, 0);
    }, [tableId]);

    useEffect(() => {
        handleRenderStickyColumns();
    }, [columns, tableId, data, handleRenderStickyColumns]);

    return (
        <thead className="position-sticky top-0 z-index-3">
            {rowHeader?.map((row, index) => {
                return (
                    <tr className="text-header-table fw-600 fw-bolder text-capitalize-first gs-0 border" key={index}>
                        {row?.map((col, idx) => (
                            <th
                                key={col.field + idx}
                                className={`p-table text-center bg-header-table ${col.isSticky ? `column-header-group-sticky-${tableId} sticky-column` : ""
                                    }`}
                                style={col.headerStyle}
                                rowSpan={calculateRowSpan(col, index)}
                                colSpan={calculateColSpan(col)}
                            >
                                {col.name}
                            </th>
                        ))}
                    </tr>
                );
            })}
        </thead>
    );
}

export default TableHeader;
