import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";


const initialValues = {
    email: '',
    password: '',
    non_field_errors: ''
}

const validationSchema = Yup.object({
    email: Yup.string()
        .required('required')
        .matches(
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
            'Invalid email format'
        ),

    password: Yup.string()
        .required('required')
        .min(6, 'Password Incorrect')
        .matches(/[0-9]/, 'Password Incorrect')
        .matches(/[a-z]/, 'Password Incorrect')
        .matches(/[A-Z]/, 'Password Incorrect')
        .matches(/[^\w]/, 'Password Incorrect')
});

export default function Login() {
    const [passwordType, setPasswordType] = useState("password");
    const [passwordIcon, setPasswordIcon] = useState(faEyeSlash);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const showPassword = () => {
        setPasswordType(passwordType === "password" ? "text" : "password");
        setPasswordIcon(passwordIcon === faEye ? faEyeSlash : faEye);
    };

    const onSubmit = async (values, { setErrors }) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post('auth/token/login', values);
            login(response)
            console.log('login successful', response);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            }
        } finally {
            setIsSubmitting(false); // Re-enable the submit button
        }
    };

    return (
        <div className='flex flex-col items-center mt-8 px-6'>
            <Link to="/" className="text-3xl font-extrabold text-blue-700 tracking-wider drop-shadow-lg">To Do</Link>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-10">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Log in</h2>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    <Form noValidate>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-600">Email</label>
                            <Field type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <ErrorMessage name="email">
                                {msg => <div className="text-red-500">{msg}</div>}
                            </ErrorMessage>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-600">Password</label>
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={passwordIcon} className='absolute pl-2 text-black opacity-40' onClick={showPassword} />
                                <Field type={passwordType} name="password" id="password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10" />
                            </div>
                            <ErrorMessage name="password">
                                {msg => <div className="text-red-500">{msg}</div>}
                            </ErrorMessage>
                        </div>

                        <ErrorMessage name="non_field_errors">
                            {msg => <div className="text-red-500">{msg}</div>}
                        </ErrorMessage>

                        <button
                            type="submit"
                            className={`w-full bg-blue-500 text-white py-2 rounded-md ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-customBlue'
                                }`}
                        >
                            {isSubmitting ? 'Sending ...' : 'Log in'}
                        </button>

                        <p className="mt-4 text-center text-sm text-gray-600">
                            Don't have an account?
                            <Link to="/register" className="text-blue-500 hover:text-blue-700"> Sign Up</Link>
                        </p>

                        <div className="mt-4 text-center text-sm text-gray-600">
                            <Link to="/forget-password" className="text-blue-500 hover:text-blue-700"> Forget Password ?</Link>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}
