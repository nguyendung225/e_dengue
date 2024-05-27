import React from "react";
import { Button, Modal } from "react-bootstrap";
import FilterSearchContainer from "../../tim-kiem-truong-hop-benh/components/FilterSearchContainer";
import { OCTKTSVG } from "@oceantech/oceantech-ui";
type Props = {
  show: boolean;
  handleClose: () => void;
};
const TimKiemTHBNangCaoModal = ({ show, handleClose }: Props) => {
  
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        centered
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>TÌM KIẾM NÂNG CAO</Modal.Title>
        </Modal.Header>
        <Modal.Body className="overflow-auto spaces max-h-783">
          <FilterSearchContainer />
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button className="button-primary spaces height-100 d-flex align-items-center">
            <OCTKTSVG
              path="/media/svg/icons/search.svg"
              svgClassName="spaces h-14 w-14 color-white"
            />
            Tìm kiếm
          </Button>
          <Button className="button-primary spaces height-100 d-flex align-items-center">
            <OCTKTSVG
              path="/media/svg/icons/recycle.svg"
              svgClassName="spaces h-14 w-14 color-white"
            />
            Chọn lại
          </Button>
          <Button className="button-primary spaces height-100 d-flex align-items-center"
           onClick={()=> handleClose() }>
            <OCTKTSVG
              path="/media/svg/icons/close.svg"
              svgClassName="spaces h-14 w-14 color-white"
            />
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TimKiemTHBNangCaoModal;
