import { GoArrowUpRight } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import Modal from "./Modal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

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
    <div className="flex flex-row">
      <div className="flex flex-row">
        <div className="text-todo itum">{/* <span>{item}</span> */}</div>

        <ItemContent className="flex flex-row">
          <ItemTitle>{item}</ItemTitle>
          <ItemDescription>
            Hier sollte stehen wie viel noch zu tunen ist
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm" onClick={() => toggleModal()}>
            Kurz Übersicht
          </Button>
          <Button
            onClick={() => gotopage(item_value)}
            variant="outline"
            size="sm"
          >
            Live thread
          </Button>
        </ItemActions>
        <div className="icons"></div>
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
