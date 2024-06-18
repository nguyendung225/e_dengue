import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import FilterSearchContainer from "../../tim-kiem-truong-hop-benh/components/FilterSearchContainer";
import { OCTKTSVG } from "@oceantech/oceantech-ui";
import { ISearchObjectModel } from "../../models/TimKiemTruongHopBenhModels";
import SearchAdvanceForm from "../../tim-kiem-truong-hop-benh/components/SearchAdvanceForm";
import { SEARCH_OBJECT_INIT } from "../../tim-kiem-truong-hop-benh/constants/constants";
import { useFormikContext } from "formik";
import { localStorageItem } from "../../../utils/LocalStorage";
import { KEY_LOCALSTORAGE } from "../../../auth/core/_consts";

type Props = {
  show: boolean;
  handleClose: () => void;
  searchObject: ISearchObjectModel;
  setSearchObject: React.Dispatch<React.SetStateAction<ISearchObjectModel>>
};

type TFilterSearchContainerChildProps = {
  handleClose: () => void;
}

const FilterSearchContainerChild = ({ handleClose }: TFilterSearchContainerChildProps) => {
  const { setValues } = useFormikContext<ISearchObjectModel>();
  const [isReSetForm,setIsResetForm] = useState<boolean>(false)
  const userData = localStorageItem.get(KEY_LOCALSTORAGE.USER_INFOMATION);
  
  useEffect(() => {
    setValues({
      ...SEARCH_OBJECT_INIT,
      tinh: userData?.tinhInfo || null,
      huyen: userData?.huyenInfo || null,
      xa: userData?.xaInfo || null,
    });
  }, [isReSetForm]);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>TÌM KIẾM NÂNG CAO</Modal.Title>
      </Modal.Header>
      <Modal.Body className="overflow-auto spaces max-h-783">
        <SearchAdvanceForm />
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button
          className="button-primary spaces height-100 d-flex align-items-center"
          type="submit"
        >
          <OCTKTSVG
            path="/media/svg/icons/search.svg"
            svgClassName="spaces h-14 w-14 color-white"
          />
          Tìm kiếm
        </Button>
        <Button
          className="button-primary spaces height-100 d-flex align-items-center"
          onClick={() => setIsResetForm(prev=>!prev)}
        >
          <OCTKTSVG
            path="/media/svg/icons/recycle.svg"
            svgClassName="spaces h-14 w-14 color-white"
          />
          Chọn lại
        </Button>
        <Button className="button-primary spaces height-100 d-flex align-items-center"
          onClick={() => handleClose()}>
          <OCTKTSVG
            path="/media/svg/icons/close.svg"
            svgClassName="spaces h-14 w-14 color-white"
          />
          Đóng
        </Button>
      </Modal.Footer>
    </>
  )
}

const TimKiemTHBNangCaoModal = ({
  show,
  handleClose,
  setSearchObject,
  searchObject
}: Props) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      centered
      className="custom-modal"
      backdrop="static"
    >
      <FilterSearchContainer
        searchObject={searchObject}
        setSearchObject={setSearchObject}
        handleCloseModal={handleClose}
      >
        <FilterSearchContainerChild handleClose={handleClose} />
      </FilterSearchContainer>
    </Modal>
  );
};

export default TimKiemTHBNangCaoModal;
