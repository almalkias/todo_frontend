import React from 'react';

export default function DeleteModal({ isOpen, onClose, onSubmit, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 w-80">
                <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
                {children}
                <div className='mt-4'>
                    <button
                        onClick={onSubmit}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
                    >
                        Delete
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
