import React, { useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';


export default function AccountActivate() {
    const { uid, token } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('auth/users/activation/', { uid, token });
                console.log(response, 'Account activated successfully');
            } catch (error) {
                console.error('Error activating account', error);
            }
        };
        fetchData();
    }, [uid, token]);

    return (
        <div className="flex flex-col items-center text-black text-2xl text-center pt-28">
            <h1>Now your account activated. You can login and use website</h1>
            <Link className='border-2 border-black border-solid p-2 rounded-md mt-5' to='/login'>Log in</Link>
        </div>
    );
}
