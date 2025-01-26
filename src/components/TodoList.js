import { useState, useContext } from "react";
import TodoItem from './TodoItem';
import { AuthContext } from "./context/AuthContext";
import axios from "axios";
import DeleteModal from "./modals/DeleteModal";
import AddItemModal from "./modals/AddItemModal";


export default function TodoList({ category, onDelete }) {
    const [items, setItems] = useState(category.tasks.sort((a, b) => a.is_completed - b.is_completed) || []);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
    const { authToken } = useContext(AuthContext);


    const openDeleteModal = (itemId) => {
        setItemToDelete(itemId);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setItemToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const openAddItemModal = () => {
        setIsAddItemModalOpen(true);
    };

    const closeAddItemModal = () => {
        setIsAddItemModalOpen(false);
    };

    const handleDelete = async () => {
        if (itemToDelete) {
            try {
                await axios.delete(`tasks/${itemToDelete}/`, {
                    headers: { 'Authorization': `Token ${authToken}` },
                });

                // Remove the deleted item from the state
                setItems((prevItems) =>
                    prevItems.filter((item) => item.id !== itemToDelete)
                );

                closeDeleteModal(); // Close the modal after deletion
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    const handleAddItem = async (newItem) => {
        try {
            const response = await axios.post(
                'tasks/',
                {
                    title: newItem,
                    "category": category.id
                },
                { headers: { 'Authorization': `Token ${authToken}` } }
            );

            // Update categories with the new category
            setItems((prevItems) => [...prevItems, response.data]);
            closeAddItemModal();
        } catch (error) {
            console.error('Error adding item:', error.response.data);
        }
    };

    const handleToggleCompletion = async (todoId, isCompleted) => {
        try {
            const response = await axios.patch(
                `tasks/${todoId}/`,
                {
                    is_completed: isCompleted
                },
                { headers: { Authorization: `Token ${authToken}` } }
            );

            // Update the specific task in the state
            const updatedItems = items.map((item) =>
                item.id === todoId ? { ...item, is_completed: response.data.is_completed } : item
            );

            const sortedItems = updatedItems.sort((a, b) => a.is_completed - b.is_completed);
            setItems(sortedItems);
        } catch (error) {
            console.error('Error updating task completion status:', error.response.data);
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <div key={category.id} className='mb-6 px-5 pb-5 rounded-lg bg-white'>
                <div className='flex justify-between items-center border-b-2 p-3'>
                    <h2 className="text-2xl font-semibold text-gray-800">{category.name}</h2>
                    <button
                        className="ml-4 bg-gray-500 text-white px-2 rounded hover:bg-gray-600" onClick={onDelete}>
                        X
                    </button>
                </div>
                <button
                    onClick={openAddItemModal}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 my-4"
                >
                    Add Todo
                </button>
                <ul>
                    {items.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onDelete={() => openDeleteModal(todo.id)}
                            onItemToggle={handleToggleCompletion}
                        />
                    ))}
                </ul>
            </div>

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onSubmit={handleDelete}
                title="Delete Task ?"
            >
            </DeleteModal>

            <AddItemModal
                isOpen={isAddItemModalOpen}
                onClose={closeAddItemModal}
                onSubmit={handleAddItem}
            />
        </div>
    )
}
