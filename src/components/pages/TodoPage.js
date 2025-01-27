import { useState, useEffect, useContext } from "react";
import TodoList from '../TodoList';
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import DeleteModal from "../modals/DeleteModal";
import AddListModal from "../modals/AddListModal";


export default function TodoPage() {
    const [categories, setCategories] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);
    const { authToken } = useContext(AuthContext);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('categories/', {
                    headers: { 'Authorization': `Token ${authToken}` }
                });
                setCategories(response.data);
            } catch (error) {
                console.error('There was an error fetching todos: ', error);
            }
        };
        fetchData();
    }, [authToken]);

    const openDeleteModal = (categoryId) => {
        setCategoryToDelete(categoryId);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setCategoryToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const openAddListModal = () => {
        setIsAddListModalOpen(true);
    };

    const closeAddListModal = () => {
        setIsAddListModalOpen(false);
    };


    const handleDelete = async () => {
        if (categoryToDelete) {
            try {
                await axios.delete(`categories/${categoryToDelete}/`, {
                    headers: { 'Authorization': `Token ${authToken}` },
                });

                // Remove the deleted category from the state
                setCategories((prevCategories) =>
                    prevCategories.filter((category) => category.id !== categoryToDelete)
                );

                closeDeleteModal(); // Close the modal after deletion
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        }
    };

    const handleAddCategory = async (newCategory) => {
        try {
            const response = await axios.post(
                'categories/',
                { name: newCategory },
                { headers: { 'Authorization': `Token ${authToken}` } }
            );

            // Update categories with the new category
            setCategories((prevCategories) => [...prevCategories, response.data]);
            closeAddListModal();
        } catch (error) {
            const errorMessage = error.response.data.non_field_errors || error.response.data.name || 'Failed to add category.';
            console.error('Error:', errorMessage);
            alert(errorMessage);
        }
    };


    return (
        <div className="container mx-auto p-4 pt-28">
            {categories.map((category) => (
                <TodoList
                    key={category.id}
                    category={category}
                    onDelete={() => openDeleteModal(category.id)} />
            ))}
            <button
                onClick={openAddListModal}
                className="w-40 bg-red-500 text-white p-2 rounded-md font-semibold cursor-pointer hover:bg-red-600"
            >
                Add New Todo List
            </button>

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onSubmit={handleDelete}
                title="Delete Category ?"
            >
                <p>This will delete all tasks in this list.</p>
            </DeleteModal>

            <AddListModal
                isOpen={isAddListModalOpen}
                onClose={closeAddListModal}
                onSubmit={handleAddCategory}
            />
        </div>
    )
}
