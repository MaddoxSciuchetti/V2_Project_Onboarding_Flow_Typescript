import { createContext, useContext, useReducer, ReactNode } from 'react';
import { modalReducer } from '../employee-overview/reducers/employee-modal-reducer';
import { ModalState } from '../employee-overview/types/reducer.type';

type EmployeeModalContextType = {
  modalState: ModalState;
  openCreate: () => void;
  openEdit: (employeeId: string, fullname: string) => void;
  closeModal: () => void;
};

export const EmployeeModalContext =
  createContext<EmployeeModalContextType | null>(null);

export function EmployeeModalProvider({ children }: { children: ReactNode }) {
  const [modalState, dispatch] = useReducer(modalReducer, { kind: 'closed' });

  const openCreate = () => {
    dispatch({ type: 'OPEN_CREATE' });
  };

  const openEdit = (employeeId: string, fullname: string) => {
    dispatch({ type: 'OPEN_EDIT', employeeId, fullname });
  };
  const closeModal = () => {
    dispatch({ type: 'CLOSE' });
  };

  return (
    <EmployeeModalContext.Provider
      value={{ modalState, openCreate, openEdit, closeModal }}
    >
      {children}
    </EmployeeModalContext.Provider>
  );
}
