import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from './context/AuthContext';

export default function Landing() {
    const { authToken } = useContext(AuthContext);

    return (
        <div className="flex flex-col items-center text-center pt-28 px-4">
            <h2 className='font-bold text-2xl'>From to-dos to done!</h2>
            <p className='text-xl pt-3 pb-5'>Keep track of tasks, deadlines, and goals Anytime, Anywhere.</p>
            {!authToken && <Link to="/register" className='border-2 border-black border-solid p-2 rounded-md'>Start Now</Link> }
        </div>
    )
}