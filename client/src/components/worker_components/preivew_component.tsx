import { useBodyScrollLock } from "@/hooks/use-no-scroll";
import { Button } from "../ui/button";
import { Text } from "../ui/maddox_customs/maddox_text";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

type PreviewCompoent = {
  onClose: () => void;
  id: number;
  description: string;
};

function PreviewComponent({ onClose, id, description }: PreviewCompoent) {
  const { lockScroll, unlockScroll } = useBodyScrollLock();
  useEffect(() => {
    lockScroll();

    return () => {
      unlockScroll();
    };
  }, [lockScroll, unlockScroll]);

  return (
    <>
      <div
        onClick={onClose}
        className="h-screen inset-0 fixed z-40 bg-black/60"
      ></div>
      <div className="absolute text-center items-center z-50 bg-gray-200 rounded-xl top-[20%] left-[50%] h-1/5 w-2xl -translate-x-1/2 -translate-y-1/2">
        <p>Place for description: {description}</p>
        <Text>Habe ich erldigt</Text>
        <Select>
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="bg-amber-50">
              <SelectItem value="apple">Erledigt</SelectItem>
              <SelectItem value="banana">Offen</SelectItem>
              <SelectItem value="blueberry">In Bearbeitung</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button>Edit here</Button>
      </div>
    </>
  );
}

export default PreviewComponent;
