"use client"
import React from 'react';
import { FaTimes } from "react-icons/fa";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg z-50 overflow-y-auto">
                <div className="modal-content py-4 text-left px-6 bg-color-primary">
                    {/* Modal header */}
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Edit Comments</h1>
                        <button onClick={onClose} className="text-color-red">
                            <FaTimes className="h-6 w-6 transition-all duration-700 ease-out" />
                        </button>
                    </div>
                    {/* Modal content */}
                    {children}
                </div>
            </div>
        </div>
    );
};
export default Modal;
