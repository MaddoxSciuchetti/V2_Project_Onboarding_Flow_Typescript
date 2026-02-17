import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    deleteEmployeeHandler,
    DescriptionData,
    fetchRawDescription,
} from "@/lib/api";

type ModalEditMitarbeiterProps = {
    fullname: string;
    toggleEmployeeModal: () => void;
    id: string | undefined;
};

function ModalEditMitarbeiter({
    fullname,
    toggleEmployeeModal,
    id,
}: ModalEditMitarbeiterProps) {
    const {
        data: descriptionData,
        isLoading,
        isError,
    } = useQuery<DescriptionData>({
        queryKey: ["descriptionData"],
        queryFn: fetchRawDescription,
    });

    const [absence, setAbsence] = useState<string>("");
    const [absencetype, setAbsenceType] = useState<string>();
    const [absencebegin, setAbsenceBegin] = useState<string>();
    const [absenceEnd, setAbsenceEnd] = useState<string>();
    const [substitute, setSubstitute] = useState<string>();

    const {
        mutate: DeleteEmployee,
        error,
        isError: isErrorMutation,
    } = useMutation({
        mutationFn: deleteEmployeeHandler,
        onSuccess: () => {
            toggleEmployeeModal;
        },
        onError: () => {
            console.log(error);
        },
    });

    console.log("descriptiond data");
    console.log(descriptionData);
    if (isLoading) return <div>Is Loading</div>;
    if (isError) return <div>No error</div>;
    if (!id) return <div>There is no id</div>;

    return (
        <>
            <div className="flex flex-col max-h-100 min-h-120 mt-40 mx-auto text-center items-center z-50 bg-gray-200 rounded-xl  w-2xl">
                <div className="max-w-xl h-full w-xl my-10">
                    <Button
                        variant={"outline"}
                        onClick={() => DeleteEmployee(id)}
                    >
                        Delete Mitarbeiter
                    </Button>
                    <div className="flex flex-col gap-5">
                        <Label htmlFor="firstname">
                            Abwesenheit eintragen für {fullname}
                        </Label>

                        <select
                            value={absence}
                            onChange={(e) => setAbsence(e.target.value)}
                        >
                            <option>ja</option>
                        </select>

                        <Label>Art der Abwesenheit</Label>
                        <select
                            value={absencetype}
                            onChange={(e) => setAbsenceType(e.target.value)}
                        >
                            <option>Krank</option>
                            <option>Urlaub</option>
                            <option>Andere</option>
                        </select>

                        <Label>Anfang der Abwesenheit</Label>

                        <Input
                            type="text"
                            id="firstname"
                            placeholder="First Name"
                            value={absencebegin}
                            onChange={(e) => setAbsenceBegin(e.target.value)}
                        />

                        <Label>Voraussichtliches Ende der Abwesenheit</Label>

                        <Input
                            type="text"
                            id="firstname"
                            placeholder="First Name"
                            value={absenceEnd}
                            onChange={(e) => setAbsenceEnd(e.target.value)}
                        />
                    </div>

                    {descriptionData?.map((vlaue, index) => (
                        <div key={index}></div>
                    ))}

                    {/* When this is clicked than open the descriptions so that the owner can be temporarly switched for them */}
                </div>
            </div>
        </>
    );
}

export default ModalEditMitarbeiter;
