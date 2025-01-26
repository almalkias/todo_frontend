import { useState } from "react";

export default function AddItemModal({ isOpen, onClose, onSubmit }) {
    const [itemTitle, setItemName] = useState("");
    // const [description, setDescription] = useState("");
    // const [dueDate, setDueDate] = useState("");
    // const [priority, setPriority] = useState("M");

    const handleSubmit = () => {
        if (itemTitle.trim()) {
            onSubmit(itemTitle);
            setItemName(""); // Reset input
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-80">
                <h2 className="text-xl font-semibold mb-4 text-center">Add New Item</h2>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    placeholder="Item Title"
                    value={itemTitle}
                    onChange={(e) => setItemName(e.target.value)}
                />
                <div className="flex justify-center">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                    >
                        Add
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
