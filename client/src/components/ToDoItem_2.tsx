import { GoArrowUpRight } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import Modal from "./Modal";

interface ToDoItem {
  item_value: number;
  item: string;
  gotopage: any;
  onRemove: (value_item: number) => any;
}

export function ToDoItem_2({ item_value, item, gotopage, onRemove }: ToDoItem) {
  const [modal, setModal] = useState<boolean>(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div className="item-wrapper">
      <div className="items">
        <div className="text-todo itum">
          <span>{item}</span>
        </div>
        <div className="icons">
          <div className="itum arrow_btn">
            <GoArrowUpRight onClick={() => gotopage(item_value)} />
          </div>
          <div className="itum delete_btn">
            <MdDelete onClick={() => toggleModal()} />
          </div>
        </div>
      </div>

      {modal && (
        <Modal
          toggleModal={toggleModal}
          value_item={item_value}
          completeRemove={onRemove}
        />
      )}
    </div>
  );
}
