import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router'

export const SignOut = () => {
    const navigate = useNavigate()

    const handleSignOut = async () => {
        await signOut(auth)
        navigate('/signin')
    }

    return <button className='logout' onClick={handleSignOut}>Logout</button>
}