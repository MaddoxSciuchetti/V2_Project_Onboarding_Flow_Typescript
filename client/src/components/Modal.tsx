import "./Modal.css"
import {useState} from "react";
import { TiDelete } from "react-icons/ti";


interface Modal {
    value_item: number
    toggleModal: any
    completeRemove: any
    item: any
}


export function Modal({ item, value_item,  toggleModal, completeRemove}: Modal) {
    return(
        <>
            <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                    <div>

                        <TiDelete className="x-item" onClick={toggleModal}/>
                    </div>
                    <h2 className="styling">Mit diser Aktion wird der Mitarbeiter und sein Fortschritt gelöscht</h2>
                    <button className="close-modal styling" onClick={() => {toggleModal() , completeRemove(value_item);}}>Löschen</button>
                </div>
            </div>

        </>
    )
}

