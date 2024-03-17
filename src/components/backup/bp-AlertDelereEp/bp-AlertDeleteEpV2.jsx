import React from "react";
import PropTypes from "prop-types";
import Modal from 'react-modal';
import { collection, query, where, getDocs, deleteDoc, } from 'firebase/firestore'; // Import Firebase Firestore functions
import { db } from '../firebase'; // Import your Firebase instance

import './css/AlertDeleteEP.css';

Modal.setAppElement('#root');


function AlertDeleteEP({ modalIsOpen, setModalIsOpen, storyId, refEp }) {



    const handleDelete = async () => {
        try {
            console.log('receive :' + storyId);
            console.log('DeleteEp : ' + refEp);
            if (!storyId) {
                console.error("Error: Story ID is empty");
                return;
            }

            const q = query(collection(db, storyId), where("id", "==", refEp));
            const querySnapshot = await getDocs(q);

            const deletePromises = querySnapshot.docs.map(async (doc) => {
                await deleteDoc(doc.ref);
                console.log("Document successfully deleted!");
            });

            await Promise.all(deletePromises);

            setModalIsOpen(false);
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };


    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Delete Episode Confirmation"
            className="custom-modal"
            overlayClassName="custom-overlay"
        >
            <div className="modal-content-delete">
                <h2>Are you sure you want to delete this episode?</h2>
                <button className='yes' onClick={handleDelete}>Yes</button>
                <button onClick={() => setModalIsOpen(false)}>No</button>
            </div>
        </Modal>
    );
}

AlertDeleteEP.propTypes = {
    modalIsOpen: PropTypes.bool.isRequired,
    setModalIsOpen: PropTypes.func.isRequired,
    storyId: PropTypes.string.isRequired,
    refEp: PropTypes.string.isRequired,
};

export default AlertDeleteEP;
