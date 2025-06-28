import React, { useState, useEffect } from 'react'
import PaaswordBox from '../components/PaaswordBox'
import axios from 'axios'
import toast from 'react-hot-toast'
const Homepage = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [token, setToken] = useState('')
    const BaseUrl = import.meta.env.BASE_URL
    
    // Extract token from URL when component mounts
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const tokenFromUrl = urlParams.get('token')
        if (tokenFromUrl) {
            setToken(tokenFromUrl)
        }
    }, [])
    
    const setResetPassword = async() => {
        if (!token) {
            toast.error('token not found')
            return
        }
        
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }
        
        try {
            const res = await axios.put(`${BaseUrl}/auth/password/reset/${token}`, {
                password: password,
                confirmPassword: confirmPassword
            })
            console.log('Password reset successful:', res.data)
            toast.success('Password reset successful!')
        } catch (error) {
            console.error('Password reset failed:', error)
            toast.error('Password reset failed')
        }
    }
    
    return (
        <div className='min-h-screen flex flex-col px-4'>
            <div className='mt-40'>
                <h2 className='text-white text-glow'>Welcome to the GymsHood. Reset your password here</h2>
            </div>
            <div className='w-full flex justify-center mt-10'>
                <PaaswordBox label={"Enter your password here"} password={password} setpassword={setPassword}/>
            </div>
            <div className='w-full flex justify-center mt-10'>
                <PaaswordBox label={"Enter your confirm password here"} password={confirmPassword} setpassword={setConfirmPassword}/>
            </div>
            <div className='w-full flex justify-center mt-6'>
                <button 
                    onClick={setResetPassword}
                    className='button'
                >
                    Reset Password
                </button>
            </div>
        </div>
    )
}

export default Homepage