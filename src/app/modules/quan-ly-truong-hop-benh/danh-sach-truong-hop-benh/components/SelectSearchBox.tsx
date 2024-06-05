import { OCTTextValidator } from '@oceantech/oceantech-ui';
import { useContext, useEffect, useState } from 'react';
import DanhSachModal from './DanhSachModal';
import AppContext from '../../../../AppContext';
import { toast } from 'react-toastify';
import { columnNamesType } from '../../../component/table/table-custom/TableCustom';
import { AxiosResponse } from 'axios';
import { KEY } from '../../../utils/Constant';

type Props = {
    value?: number | null | string
    lable: string
    placeholder?: string
    columns: columnNamesType[]
    service: (searchObject: any) => Promise<AxiosResponse<any, any>>
    handleSelect: (value: any) => void
    searchObject?: any
    disabled?: boolean
}

const SelectSearchBox = (props: Props) => {
    const {
        lable,
        placeholder = "Nhập tên hoặc mã bệnh nhân và [Enter] để tìm kiếm",
        columns = [],
        service,
        handleSelect,
        searchObject
    } = props;

    const [openDS, setOpenDS] = useState(false)
    const [data, setData] = useState([])
    const { setPageLoading } = useContext(AppContext);
    const [configTable, setConfigTable] = useState<any>({});
    const [searchParams, setSearchParams] = useState<any>(searchObject);

    useEffect(() => {
        setSearchParams(searchObject)
    }, [searchObject])

    const handleGetData = async () => {
        try {
            setPageLoading(true)
            const { data } = await service(searchParams);
            setData(data?.data?.data)
            setOpenDS(true)
            setConfigTable({
                totalPages: data?.data?.totalPages,
                totalElements: data?.data?.total,
                numberOfElements: data?.data?.numberOfElements,
            })

        } catch (error) {
            console.error(error);
            toast.error(error as string);

        } finally {
            setPageLoading(false)
        }
    }

    const handleChange = (event: any) => {
        if (event?.key === KEY.ENTER) {
            event.preventDefault()
            setSearchParams({ ...searchParams, keyword: event?.target?.value })
        }
    }

    useEffect(() => {
        if (searchParams?.keyword?.length > 0) {
            handleGetData()
        }
    }, [searchParams])

    return (
        <>
            <OCTTextValidator
                disabled={props.disabled}
                lable={lable}
                placeholder={placeholder}
                onKeyDown={handleChange}
            />
            {
                openDS &&
                <DanhSachModal
                    setSearchObject={setSearchParams}
                    handleClose={() => setOpenDS(false)}
                    title="Danh sách trường hợp bệnh"
                    columns={columns}
                    data={data}
                    configTable={configTable}
                    setDataSelected={handleSelect}
                />
            }
        </>
    )
}
export default SelectSearchBox