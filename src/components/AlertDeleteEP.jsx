import React from "react";
import PropTypes from "prop-types"; // นำเข้า PropTypes
import Model from 'react-modal';

import './css/AlertDeleteEP.css'; // นำเข้าไฟล์ CSS

// ตั้งค่า App Element สำหรับ Modal
Model.setAppElement('#root');

// กำหนดคอมโพเนนต์ AlertDeleteEP ที่รับ props เป็น modalIsOpen, setModalIsOpen, และ handleDeleteEP และ handleDelete
function AlertDeleteEP({ modalIsOpen, setModalIsOpen, handleDeleteEP, episodeNumber }) {
    return (
        <Model
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Delete Episode Confirmation"
            className="custom-modal"
            overlayClassName="custom-overlay"
        >
            <div className="modal-content-delete">
                <h2>Are you sure you want to delete episode {episodeNumber}?</h2>
                <button className='yes' onClick={() => handleDeleteEP(episodeNumber)}>Yes</button>
                <button onClick={() => setModalIsOpen(false)}>No</button>
            </div>
        </Model>

    ); 
}

// กำหนด PropTypes เพื่อตรวจสอบชนิดของ props ที่ AlertDeleteEP Component รับเข้ามา
AlertDeleteEP.propTypes = {
    modalIsOpen: PropTypes.bool.isRequired,
    setModalIsOpen: PropTypes.func.isRequired,
    handleDeleteEP: PropTypes.func.isRequired,
    episodeNumber: PropTypes.number.isRequired,

};


// ส่งออก AlertDeleteEP Component เพื่อนำไปใช้งานในตำแหน่งต่าง ๆ ในแอปพลิเคชัน
export default AlertDeleteEP;