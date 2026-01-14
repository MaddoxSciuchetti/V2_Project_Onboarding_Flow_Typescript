import { Button } from "./ui/button";
import {
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ToDoItem {
  item_value: number;
  item: string;
  gotopage: (taskId: number) => void;
  onRemove: (value_item: number) => void;
}

export function ToDoItem_2({ item_value, item, gotopage, onRemove }: ToDoItem) {
  return (
    <div className="flex flex-row max-w-md mt-3 border ">
      <div className="flex flex-row">
        <div className="text-todo itum">{/* <span>{item}</span> */}</div>
        <ItemContent className="flex">
          <ItemTitle className="text-xl">{item}</ItemTitle>
          <ItemDescription>Progress Coming Soon</ItemDescription>
        </ItemContent>
        <div className="flex flex-row content-center gap-5">
          <ItemActions>
            <Button
              onClick={() => gotopage(item_value)}
              variant="outline"
              size="sm"
            >
              Live thread
            </Button>
          </ItemActions>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-20">. . . </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Button
                onClick={() => onRemove(item_value)}
                className="flex flex-row bg-white-500 hover:text-white font-bold py-2 px-4 rounded"
              >
                Löschen
              </Button>
              <Button>Teilen</Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
