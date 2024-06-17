import { useFormikContext } from "formik";
import { TruongHopBenh } from "../model/Model";
import CustomMap from "../../../component/map/CustomMap";

const ToaDoCaBenh = () => {
    const { values } = useFormikContext<TruongHopBenh>();
    const toadoCaBenh: any =
        values.truongHopBenh.kinhDo && values.truongHopBenh.viDo
            ? [values.truongHopBenh.viDo, values.truongHopBenh.kinhDo]
            : null;
    return toadoCaBenh ? (
        <CustomMap defaultMakerPostion={toadoCaBenh} />
    ) : (
        <div className="text-center text-primary fs-2 p-10">Chưa xác nhận tọa độ ca bệnh</div>
    );
};

export default ToaDoCaBenh;
