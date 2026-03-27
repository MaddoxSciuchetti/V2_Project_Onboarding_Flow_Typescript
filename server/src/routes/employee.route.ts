import {
    deleteEmplyoee,
    editAbsenceData,
    getEmployee,
    getEmployeeById,
    getEmployeeWorkerData,
} from "@/controllers/employee.controller";
import { checkChef } from "@/utils/checkChef";
import express from "express";
import * as EmployeeV2 from "../controllers/employee.controllerV2";

const employeeRoutes = express.Router();

// prefix /employee

employeeRoutes.get("/getEmployeeWorkerData", checkChef, getEmployeeWorkerData);
employeeRoutes.get(
    "/v2/getEmployeeWorkerData",
    checkChef,
    EmployeeV2.getEmployeeWorkerData,
);

employeeRoutes.get("/specificEmployeeData", checkChef, getEmployee);
employeeRoutes.get(
    "/v2/specificEmployeeData",
    checkChef,
    EmployeeV2.getEmployee,
);
employeeRoutes.get("/getEmployeeBy Id/:id", checkChef, getEmployeeById);
employeeRoutes.get(
    "/v2/getEmployeeById/:id",
    checkChef,
    EmployeeV2.getEmployeeById,
);
employeeRoutes.delete("/deleteEmplyoee/:id", checkChef, deleteEmplyoee);
employeeRoutes.delete(
    "/v2/deleteEmplyoee/:id",
    checkChef,
    EmployeeV2.deleteEmployee,
);
employeeRoutes.put("/editAbsenceData", checkChef, editAbsenceData);
employeeRoutes.put(
    "/v2/editAbsenceData",
    checkChef,
    EmployeeV2.editAbsenceData,
);

export { employeeRoutes };
