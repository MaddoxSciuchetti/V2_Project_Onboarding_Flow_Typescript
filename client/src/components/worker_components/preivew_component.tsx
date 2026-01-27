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

type PreviewCompoent = {
  onEditClick: () => void;
};

function PreviewComponent({ onEditClick }: PreviewCompoent) {
  return (
    <>
      <p>Arbeitsvertrag unterschrieben zurück + BSB Dokumente</p>
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

      <Button onClick={onEditClick}>Edit here</Button>
    </>
  );
}

export default PreviewComponent;
