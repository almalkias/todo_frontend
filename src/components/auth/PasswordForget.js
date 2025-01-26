import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";


const initialValues = {
    email: '',
}

const validationSchema = Yup.object({
    email: Yup.string()
        .required('required')
        .matches(
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
            'Invalid email format'
        )
})


export default function PasswordForget() {

    const onSubmit = async (values, { setErrors }) => {
        try {
            const response = await axios.post('auth/users/reset_password/', values);
            console.log("Password reset request sent", response);
        } catch (error) {
            setErrors(error.response.data);
            console.error("Error sending password reset request", error);
        }
    };

    return (
        <div className='flex flex-col items-center mt-8 px-6'>
            <Link to="/" className="text-3xl font-extrabold text-blue-700 tracking-wider drop-shadow-lg">To Do</Link>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-10">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Password Reset</h2>
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

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Send
                        </button>

                        <p className="mt-4 text-center text-sm text-gray-600">
                            back to
                            <Link to="/login" className="text-blue-500 hover:text-blue-700"> Log in</Link>
                        </p>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}
