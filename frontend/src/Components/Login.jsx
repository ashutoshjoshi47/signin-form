import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from "react-toastify"
import axios from "axios"


const Login = ({ setToken }) => {
    const [currentState, setCurrentState] = useState("Login")

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const formSubmission = async (event) => {
        event.preventDefault()
        try {
            if (currentState === "Sign Up") {
                const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })

                if (response.data.success) {
                    setToken(response.data.token)
                    toast.success(response.data.message)

                } else {
                    toast.error(response.data.message)
                }

            }
            else {
                const response = await axios.post(backendUrl + '/api/user/login', { email, password })

                if (response.data.success) {
                    setToken(response.data.token)
                    toast.success(response.data.message)

                } else {
                    toast.error(response.data.message)
                }
            }
        }
        catch (error) {
            console.log(error);
            toast.error(error.message)

        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <form onSubmit={formSubmission} className='w-full max-w-md mt-10 mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6 '>
                <div className='text-center '>
                    <p className='text-2xl font-bold text-gray-800'>{currentState}</p>
                </div>

                {currentState === "Login" ? null : (
                    <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300' />
                )}
                <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300' />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300' />

                <div className='flex justify-between text-sm text-gray-500 font-bold'>
                    <p className='cursor-pointer hover:underline'>Forgot Password</p>

                    {
                        currentState === "Login" ? (
                            <p onClick={() => setCurrentState("Sign Up")} className='cursor-pointer hover:underline'>Create account</p>
                        ) : (
                            <p onClick={() => setCurrentState("Login")} className='cursor-pointer hover:underline'>Login Here</p>
                        )
                    }
                </div>

                <button type='submit' className='w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md transition duration-300'>
                    {currentState == "Login" ? "Sign in" : "Signup"}
                </button>
            </form>
        </div>
    )
}

export default Login