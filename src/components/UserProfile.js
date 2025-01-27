import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "./context/AuthContext";


const UserProfile = () => {
    const [profile, setProfile] = useState({
        first_name: '',
        last_name: '',
        telephone: '',
        city: '',
    });
    const { authToken } = useContext(AuthContext);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('profile/', {
                    headers: { 'Authorization': `Token ${authToken}` }
                });
                setProfile({
                    first_name: response.data.first_name || '',
                    last_name: response.data.last_name || '',
                    telephone: response.data.telephone || '',
                    city: response.data.city || '',
                });
            } catch (error) {
                console.error('There was an error fetching todos: ', error);
            }
        };
        fetchData();
    }, [authToken]);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const response = await axios.put('profile/', profile, {
                headers: { Authorization: `Token ${authToken}` },
            });
            console.log(response)
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };


    return (
        <form onSubmit={onSubmit} className="pt-28 flex flex-col items-center sm:flex-row sm:justify-center sm:w-[450px] sm:flex-wrap sm:mx-auto sm:gap-3">
            <div className="mb-4">
                <label htmlFor="first_name" className="block text-sm font-medium">First Name</label>
                <input
                    type="text"
                    name="first_name"
                    value={profile.first_name ?? ''}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="last_name" className="block text-sm font-medium">Last Name</label>
                <input
                    type="text"
                    name="last_name"
                    value={profile.last_name ?? ''}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="telephone" className="block text-sm font-medium">Telephone</label>
                <input
                    type="text"
                    name="telephone"
                    value={profile.telephone ?? ''}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="city" className="block text-sm font-medium">City</label>
                <input
                    type="text"
                    name="city"
                    value={profile.city ?? ''}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded"
                />
            </div>
            <button type="submit" className="px-3 py-2 bg-blue-500 text-white font-bold rounded">
                Update Profile
            </button>
        </form>
    );
};

export default UserProfile;
