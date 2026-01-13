import "./Modal.css";
import { TiDelete } from "react-icons/ti";
import { Button } from "./ui/button";

interface ModalProps {
  value_item?: number;
  toggleModal?: () => void;
  completeRemove?: (value_item: number) => void;
}

const Modal: React.FC<ModalProps> = ({
  value_item,
  toggleModal,
  completeRemove,
}) => {
  return (
    <>
      <div className="modal">
        <div onClick={toggleModal} className="overlay"></div>
        <div className="modal-content">
          <div>
            <TiDelete className="x-item" onClick={toggleModal} />
            <p>Place holder for adding the person</p>
            <Button>Here</Button>
          </div>
          <h2 className="styling">
            Mit diser Aktion wird der Mitarbeiter und sein Fortschritt gelöscht
          </h2>
          <button
            className="close-modal styling"
            onClick={() => {
              toggleModal(), completeRemove(value_item);
            }}
          >
            Löschen
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
