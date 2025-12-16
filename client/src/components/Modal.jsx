import "/Modal.css"
import {useState} from "react";
import {TiDelete} from "react-icons/ti"

export default function Modal ({ item, toggleModal, completeRemove }) {
    return (
        <>
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
                <div>
                    <TiDelete className="x-item" onClick={toggleModal}/>
                </div>

                <h2 className="styling">Mit dieser Aktion wird der Mitarbeiter und sein Fortschritt gelöscht</h2>
            </div>
          </div>
        
        
        </>
    )
}