import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';


const initialValues = {
    username: '',
    email: '',
    password: '',
    re_password: ''
}

const validationSchema = Yup.object({
    username: Yup.string()
        .required('required')
        .matches(
            /^[a-zA-Z0-9@._+-]+$/,
            'Username can contain only English letters and numbers, as well as @ . + - _ symbols with no spaces'
        ),

    email: Yup.string()
        .required('required')
        .matches(
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
            'Invalid email format'
        ),

    password: Yup.string()
        .required('required')
        .min(6, 'Password is too short. It must be at least 6 characters')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[^\w]/, 'Password must contain at least one special character'),

    re_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords do not match')
        .required('required'),
});

export default function SignUp() {
    const [validationStatus, setValidationStatus] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    });
    const [passwordType, setPasswordType] = useState("password");
    const [passwordIcon, setPasswordIcon] = useState(faEyeSlash);
    const [password2Type, setPassword2Type] = useState("password");
    const [password2Icon, setPassword2Icon] = useState(faEyeSlash);
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);


    const showPassword = () => {
        setPasswordType(passwordType === "password" ? "text" : "password");
        setPasswordIcon(passwordIcon === faEye ? faEyeSlash : faEye);
    };

    const showPassword2 = () => {
        setPassword2Type(password2Type === "password" ? "text" : "password");
        setPassword2Icon(password2Icon === faEye ? faEyeSlash : faEye);
    };

    const onSubmit = async (values, { setErrors }) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post('auth/users/', values);
            console.log('Registration successful', response);
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            }
        } finally {
            setIsSubmitting(false); // Re-enable the submit button
        }
    };

    const handlePasswordChange = (value) => {
        setValidationStatus({
            length: value.length >= 8,
            uppercase: /[A-Z]/.test(value),
            lowercase: /[a-z]/.test(value),
            number: /[0-9]/.test(value),
            special: /[^\w]/.test(value)
        });
    };

    return (
        <div className='flex flex-col items-center mt-8 px-6'>
            <Link to="/" className="text-3xl font-extrabold text-blue-700 tracking-wider drop-shadow-lg">To Do</Link>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md my-10">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign Up</h2>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {({ handleChange }) => (
                        <Form noValidate>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-sm font-semibold text-gray-600">Username</label>
                                <Field type="text" id="username" name="username" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <ErrorMessage name="username">
                                    {msg => <div className="text-red-500">{msg}</div>}
                                </ErrorMessage>
                            </div>

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
                                    <Field type={passwordType} name="password" id="password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                                        onChange={(e) => {
                                            handleChange(e);
                                            handlePasswordChange(e.target.value);
                                        }} />
                                </div>
                                <ErrorMessage name="password">
                                    {msg => <div className="text-red-500">{msg}</div>}
                                </ErrorMessage>
                                <div className="password-check">
                                    <div className={validationStatus.length ? 'text-green-600' : 'text-red-500'}>
                                        6 characters
                                    </div>
                                    <div className={validationStatus.uppercase ? 'text-green-600' : 'text-red-500'}>
                                        1 upper (A-Z)
                                    </div>
                                    <div className={validationStatus.lowercase ? 'text-green-600' : 'text-red-500'}>
                                        1 lower (a-z)
                                    </div>
                                    <div className={validationStatus.number ? 'text-green-600' : 'text-red-500'}>
                                        1 number (0-9)
                                    </div>
                                    <div className={validationStatus.special ? 'text-green-600' : 'text-red-500'}>
                                        1 special ("~!@#$%^&*_+:;.|,-")
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4 relative">
                                <label htmlFor="re_password" className="block text-sm font-semibold text-gray-600">Confirm Password</label>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={password2Icon} className='absolute pl-2 text-black opacity-40' onClick={showPassword2} />
                                    <Field type={password2Type} name="re_password" id="re_password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10" />
                                </div>
                                <ErrorMessage name="re_password">
                                    {msg => <div className="text-red-500">{msg}</div>}
                                </ErrorMessage>
                            </div>

                            <button
                                type="submit"
                                className={`w-full bg-blue-500 text-white py-2 rounded-md ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-customBlue'
                                }`}
                            >
                                {isSubmitting ? 'Sending ...' : 'Sign Up'}
                            </button>

                            <p className="mt-4 text-center text-sm text-gray-600">
                                Already have an account?
                                <Link to="/login" className="text-blue-500 hover:text-blue-700"> Log in</Link>
                            </p>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
